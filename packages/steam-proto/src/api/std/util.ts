import {APICallClazzType, ServiceDict, ServiceMethodDict} from "./type";
import {steamStdServiceClazzMap as clazzMap} from "./gen/service-dict";



export const getProtoClazzForService = <
  T extends ServiceDict,
  M extends ServiceMethodDict<T>
>(serviceName: T, serviceMethod: M): APICallClazzType<T,M> => {
  const serviceMap = clazzMap[serviceName as keyof typeof clazzMap]
  const clazz = serviceMap[serviceMethod as keyof typeof serviceMap] as any
  return {
    reqClazz: clazz.req,
    respClazz: clazz.resp
  } as any
}