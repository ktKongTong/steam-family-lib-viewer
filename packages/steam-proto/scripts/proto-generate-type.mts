import * as fs from 'fs';
import * as path from 'path';
import {glob} from "glob";

interface ServiceItem {
    serviceName: string;
    methodName: string;
    requestType: string;
    responseType: string;
}

interface Service {
    serviceName: string;
    methods: ServiceItem[]
}

async function scanProtoFiles() {
    const filenames = await glob('proto/**/service_*.proto', { ignore: 'node_modules/**' })
    const files = filenames.map(filename => path.resolve(filename))
    const p = files.map(file => fs.promises.readFile(file, 'utf8').then(handleProto))
    const services = await Promise.all(p)
    return services.flat()
}

async function handleProto(content: string) {
    const serviceRegex = /service\s+(\w+)\s+\{([\s\S]*?)}/g;
    let match;
    const matched:string[] = [];
    while (match = serviceRegex.exec(content)) {
        matched.push(match[0]);
    }
    const res = matched.map(parseServiceItems).flat()
    return res;
}


function parseServiceItems(content: string) {
    const serviceNameRegex = /service\s+(\w+)/g;
    const [, serviceName] = serviceNameRegex.exec(content)

    if (!serviceName) return null

    const methodRowRegex = /rpc\s+(\w+)\s+\(\.?(\w+)\)\s+returns\s+\((\.?\w+)\)/g;

    const rows = content.match(methodRowRegex);
    if (!rows) {
        return {
            serviceName,
            methods: []
        }
    }
    const itemRegex = /rpc\s+(?<methodname>\w+)\s+\(\.?(?<request>\w+)\)\s+returns\s+\(\.?(?<resp>\w+)\)/;

    const services: ServiceItem[] = rows.map(row => itemRegex.exec(row))
      .map(item => {
      if (!item) return null;
        const {groups} = item;
        return {
            serviceName,
            methodName: groups.methodname,
            requestType: groups.request,
            responseType: groups.resp
        }
      })
      .filter(item => item)
      .flat()
    return {
        serviceName,
        methods: services
    }
}


function generateServiceMapItem(service: Service) {
    const methodTemplate = (method: ServiceItem) => `
        ${method.methodName}: {
            req: ${method.requestType}Schema,
            resp: ${method.responseType}Schema
        }
    `
    return `
    ${service.serviceName}: {
    ${service.methods.map(methodTemplate).join(',')}
    }
    `
}
function generateServiceMap(services: Service[]) {
    return `    
        export const steamStdServiceClazzMap = {
            ${services.map(service => generateServiceMapItem(service)).join(',\n')}
        } as const
    `
}

function generateServiceDictionary(services: Service[]) {
    const serviceTemplate = (service: Service) => `${service.serviceName}: [${service.methods.map(it => `'${it.methodName}'`).join(', ')}] as const`

    return `
    export const steamStdServiceRecord = {
        ${services.map(serviceTemplate).join(',\n')}
    } as const
    `
}

function generateImportStatement(services: Service[], suffix: 'Json' | 'Schema' | '' = '') {


    const requestTypes = services.flatMap(it => it.methods.map(it => it.requestType))
    const responseTypes = services.flatMap(it => it.methods.map(it => it.responseType))
    // reduce type name redundant
    const uniqueTypes: string[] = [...new Set([...requestTypes, ...responseTypes])]

    const importStatement = `import {
        ${uniqueTypes.map(it => it+suffix).join(',\n')}
    } from "./types"
    `
    // const importStatementWithJson = `import {
    //     ${uniqueTypes.join(',\n')},
    //     ${uniqueTypes.map(it => it+"Json").join(',\n')}
    // } from "./types"`
    return importStatement
}


function generateTypeInfer(services: Service[], jsonType: boolean) {
    const mayJson = jsonType ? "Json" : ""
    const serviceTemplate = (service: Service) =>
      `  : M extends ServiceMethodDict<'${service.serviceName}'> ? InferSteamStdReqOrResp${service.serviceName}${mayJson}Type<M,T>`

    const template = `
export type InferSteamStdReqOrResp${mayJson}Type<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>,
  T extends 'Response' | 'Request'
> =  S extends never ? never
${services.map(serviceTemplate).join('\n')}
  : never
    `


    return`
import {ServiceDict, ServiceMethodDict} from '../types'
${generateImportStatement(services, mayJson)}

${services.map((s) => generateServiceTypeInfer(s, jsonType)).join('\n\n\n')}

${template}
`
}


function generateServiceTypeInfer(service: Service, jsonType: boolean) {
const mayJson = jsonType ? "Json" : ""
 const methodInferItemTemplate = (method: ServiceItem) =>
   `  : M extends '${method.methodName}' ? (T extends 'Response' ? ${method.responseType}${mayJson} : ${method.requestType}${mayJson})`

    const template = `
type InferSteamStdReqOrResp${service.serviceName}${jsonType?'Json':''}Type<
    M extends ServiceMethodDict<S>,
    T extends 'Request'|'Response',
    S extends '${service.serviceName}' = '${service.serviceName}',
> = T extends never ? never
${service.methods.map(methodInferItemTemplate).join('\n')}
: never
    `
    return template
}


async function main() {
    const services = await scanProtoFiles()

    const serviceDictionary = `
    ${generateImportStatement(services, 'Schema')}
    
    ${generateServiceMap(services)}
    
    ${generateServiceDictionary(services)}
    `
    const typeInfer = generateTypeInfer(services, false)
    const typeInferWithJson = generateTypeInfer(services, true)

    const __dirname = import.meta.dirname;
    fs.writeFileSync(path.resolve(__dirname, '../src/api/gen/infer-type.ts'), typeInfer)
    fs.writeFileSync(path.resolve(__dirname, '../src/api/gen/infer-json-type.ts'), typeInferWithJson)
    fs.writeFileSync(path.resolve(__dirname, '../src/api/gen/service-map.ts'), serviceDictionary)
    const exporter = await genExporter()
    fs.writeFileSync(path.resolve(__dirname, '../src/api/gen/types.ts'), exporter)

    const index = `
export * from './types'
export * from './infer-type'
export * from './infer-json-type'
export * from './service-map'
`
    fs.writeFileSync(path.resolve(__dirname, '../src/api/gen/index.ts'), index)

}
async function genExporter () {
    const filenames = await glob('src/proto-gen/**/*.ts', { ignore: 'node_modules/**', nodir: true, noext: true })
    const prefix = '../..'
    const regex = /^src\/(?<exportpath>proto-gen.+)\.ts$/
    const lines = filenames.map(it => regex.exec(it))
    .filter(it => it)
    .map(it => it.groups)
    .map(it => it.exportpath)
      .map(it => `export * from '${prefix}/${it}'`)
    return lines.join('\n')
}
async function globfile() {


    console.log(await genExporter())
}

main()