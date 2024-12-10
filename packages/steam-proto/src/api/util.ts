import {APICallClazzType, ServiceDict, ServiceMethodDict} from "./types";
import {steamStdServiceClazzMap as schemaMap} from "./gen/service-map";



export const getProtoSchemaForService = <
  T extends ServiceDict,
  M extends ServiceMethodDict<T>
>(serviceName: T, serviceMethod: M): APICallClazzType<T,M> => {
  const serviceMap = schemaMap[serviceName as keyof typeof schemaMap]
  const schema = serviceMap[serviceMethod as keyof typeof serviceMap] as any
  return {
    reqSchema: schema.req,
    respSchema: schema.resp
  } as any
}