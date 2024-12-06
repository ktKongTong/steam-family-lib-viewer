import * as fs from 'fs';
import * as path from 'path';

// interface ServiceInfo {
//     serviceName: string;
//     methods: string[];
// }

function scanProtoFiles(directoryPath) {
    const serviceMap = new Map();

    // 读取目录中的所有文件
    const files = fs.readdirSync(directoryPath);

    // 过滤出 service_xxx.proto 文件
    const protoFiles = files.filter(file =>
        file.startsWith('service_') && file.endsWith('.proto')
    );

    protoFiles.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const regex = /C(?<service>[a-zA-Z]+)_(?<method>[a-z_A-Z]+)_Request/g

        const res = fileContent.match(regex)
        const services = res.map(item => {
            const res = /C(?<service>[a-zA-Z]+)_(?<method>[a-z_A-Z]+)_Request/.exec(item)
            if (!res) return
            return [res.groups.service, res.groups.method]
        })

        services.forEach(item => {
            const [serviceName, method] = item
            if (!serviceMap.has(serviceName)) {
                serviceMap.set(serviceName, [method])
            } else if (!serviceMap.get(serviceName).includes(method)) {
                serviceMap.get(serviceName).push(method)
            }
        })
    });
    return serviceMap;
}


class Generator {
    services = {}
    constructor() {
    }
    #serviceToLine (serviceName, methods) {
        const methodStr = methods.map(method => `'${method}'`).join(', ')
        return `${serviceName}: [${methodStr}] as const,`
    }

    #serviceToObj (serviceName, methods) {
        const inner = methods.map(method => `
        ${method} : {
            req: C${serviceName}_${method}_Request,
            resp: C${serviceName}_${method}_Response
        }`).join(',\n')

        return `${serviceName}: {
        ${inner}
    }`
    }
    #serviceToTypeStr(serviceName, method){
        return `C${serviceName}_${method}_Request, C${serviceName}_${method}_Response`
    }
    #serviceToTypeInferStr(serviceName, method){
        const line = (type) => `: SteamAPITypeName<S, T, Type> extends SteamAPI${type}TypeName<S, '${method}'> ? C${serviceName}_${method}_${type}`
        return [line(`Request`),line(`Response`)].join("\n")
    }
    addServices(name, method) {
        this.services[name] = [...(this.services[name] || []), method]
    }
    //
    generateRecord () {
        const that = this
        const text = Object.entries(this.services).map(([name, methods]) => that.#serviceToLine(name, methods)).join('\n    ')
        const result = `
export const steamStdServiceRecord = {
    ${ text }
}`
        return result
    }
    generateTypes () {
        const that = this
        const text = Object.entries(this.services).map(([name, methods]) => methods.map(method => that.#serviceToTypeStr(name, method))).flat().join(',\n')
        const result = `import {\n${ text }\n}  from "../../proto";`
        return result
    }
    generateMap () {
        const that = this
        const text = Object.entries(this.services).map(([name, methods]) => that.#serviceToObj(name, methods)).join(',\n    ')
        const result = `
export const steamStdServiceClazzMap = {
    ${text}
} as const
            `
        return result
    }

    generateTypeInfer () {
        const that = this
        const text = Object.entries(this.services).map(([name, methods]) => {
            const serviceItemTypeInfer = methods.map(method => that.#serviceToTypeInferStr(name, method)).join('\n')
            return `
type InferSteamStdReqOrResp${name}Type<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends '${name}' = '${name}'> = T extends never ? never
${serviceItemTypeInfer}
: never
`
        })
        return text.join('\n')
    }
}


function main() {
    const __dirname = import.meta.dirname;

    const directoryPath = path.resolve(__dirname, '../proto/web-ui');
    console.log(directoryPath)
    const serviceMap = scanProtoFiles(directoryPath);
    const recordGenerator =   new Generator()
    for (const [serviceName, methods] of serviceMap) {
        for (const method of methods) {
            recordGenerator.addServices(serviceName, method)
        }
    }

    const serviceDict = `
${recordGenerator.generateTypes()}

${recordGenerator.generateRecord()}

${recordGenerator.generateMap()}
    `

    const inferTypeFromString = `
${recordGenerator.generateTypes()}

import {
  AllRTypeDict,
  ServiceMethodDict,
  SteamAPITypeName,
  SteamAPIRequestTypeName,
  SteamAPIResponseTypeName
} from "../type";

 ${recordGenerator.generateTypeInfer()}

export type InferSteamStdReqOrRespTypeFromString<T extends AllRTypeDict> =  T extends \`C$\{infer S}_$\{infer M}_$\{'Request' | 'Response'}\` ?
 T extends \`C$\{S}_$\{M}_$\{infer Type}\` ?
    Type extends 'Request' | 'Response' ?
    S extends never ? never
    : M extends ServiceMethodDict<'FamilyGroups'> ? InferSteamStdReqOrRespFamilyGroupsType<M, Type>
    : M extends ServiceMethodDict<'Player'> ? InferSteamStdReqOrRespPlayerType<M, Type>
    : M extends ServiceMethodDict<'AccountPrivateApps'> ? InferSteamStdReqOrRespAccountPrivateAppsType<M, Type>
    : M extends ServiceMethodDict<'Authentication'> ? InferSteamStdReqOrRespAuthenticationType<M, Type>
    : M extends ServiceMethodDict<'ClientComm'> ? InferSteamStdReqOrRespClientCommType<M, Type>
    : M extends ServiceMethodDict<'Store'> ? InferSteamStdReqOrRespStoreType<M, Type>
    : M extends ServiceMethodDict<'StoreBrowse'> ? InferSteamStdReqOrRespStoreBrowseType<M, Type>
    : M extends ServiceMethodDict<'SteamDeckCompatibility'> ? InferSteamStdReqOrRespSteamDeckCompatibilityType<M, Type>
    :never
  : never
  : never
  : never

`
    fs.writeFileSync(path.resolve(__dirname, '../src/api/std/gen/infer-type-from-string.ts'), inferTypeFromString)
    fs.writeFileSync(path.resolve(__dirname, '../src/api/std/gen/service-dict.ts'), serviceDict)
}
main()
