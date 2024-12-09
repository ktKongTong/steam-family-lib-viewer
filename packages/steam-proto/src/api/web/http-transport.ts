import {EResult} from "../../enums/std-err-result";
import {InferReqType, ServiceDict, ServiceMethodDict, SteamStdRequestType, SteamStdResponseType} from "../type";
import {getProtoClazzForService} from "../util";
import {uint8ArrayToBase64} from "../../utils";


interface SteamClientOpts {

}

const serviceGetHttpMethod = [
  'IFamilyGroupsService/GetFamilyGroupForUser',
  'IFamilyGroupsService/GetPreferredLenders',
  'IFamilyGroupsService/GetFamilyGroup',
  'IFamilyGroupsService/GetSharedLibraryApps',
  'IStoreBrowseService/GetItems',
  'IPlayerService/GetPlayerLinkDetails',
  'IAccountPrivateAppsService/GetPrivateAppList',
  'IClientCommService/GetAllClientLogonInfo'
]

export const callHttpSteamStdAPI = async <
  T extends ServiceDict,
  M extends ServiceMethodDict<T>
>({
    apiVersion,
    serviceName,
    serviceMethod,
    requestData,
    accessToken,
    apiKey,
    headers,
    codec,
    method,
}: SteamStdRequestType<T, M> & {
  method?: 'GET' | 'POST',
  codec?: 'json' | 'proto'
}
): Promise<
  SteamStdResponseType<T, M>
  & { code: number }
> => {
  let url = `https://api.steampowered.com/I${serviceName}Service/${serviceMethod}/v${apiVersion ?? 1}`;
  const { reqClazz, respClazz } = getProtoClazzForService(serviceName, serviceMethod)
  // @ts-expect-error
  const reqData = new reqClazz(requestData)
  const reqBin = reqData.toBinary()

  const bufBase64 = uint8ArrayToBase64(reqBin)
  if(!method) {
    method = 'POST'
    if(serviceGetHttpMethod.includes(`I${serviceName}Service/${serviceMethod}`)) {
      method = 'GET'
    }
  }
  let options: RequestInit = {
    method,
    headers
  }

  if(method === 'GET') {
    const query = new URLSearchParams()
    if(codec && codec === 'json') {
      const obj = reqData.toJson({useProtoFieldName: true}) as Object
      let keys = Object.keys(obj)
      for(const key of keys) {
        query.set(key,obj[key as keyof object])
      }
    }else {
      query.append("input_protobuf_encoded", bufBase64)
    }
    if(accessToken) {
      query.append("access_token",accessToken)
    }
    if(apiKey) {
      query.append("key", apiKey)
    }
    url += `?${query.toString()}`
  }else {
    const form = new FormData()
    if(accessToken) {
      form.append("access_token",accessToken)
    }
    if(apiKey) {
      form.append("key", apiKey)
    }
    form.append("input_protobuf_encoded", bufBase64)
    options.body = form
  }
  let resData
  const resp = await fetch(url, options)
  if(codec && codec === 'json') {
    let data = await resp.json().then((it: any) => it.response)
    resData = respClazz.fromJson(data as any)
  }else {
    const arrBuf = await resp.arrayBuffer()
    const resBin = new Uint8Array(arrBuf)
    resData = respClazz.fromBinary(resBin)
  }
  let errResultHeader = resp.headers.get('x-eresult');
  let errorMessageHeader = resp.headers.get('x-error_message');
  let result = EResult.Invalid
  if (typeof errResultHeader == 'string') {
    result = parseInt(errResultHeader) as EResult;
  }
  let res =  {
    result: result,
    success: result === EResult.OK,
    code: resp.status,
    data: resData as any
  } as SteamStdResponseType<T, M> & { code: number }

  if (typeof errorMessageHeader == 'string') {
    res.errorMessage = errorMessageHeader;
  }
  return res
}



type FirstLetterLowerCase<T extends string> = T extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : T

type SteamHTTPAPI<S extends ServiceDict> = {
  [K in ServiceMethodDict<S> as FirstLetterLowerCase<K>]: (requestParam: InferReqType<S, K>, opts?: RequestOpts) => Promise<SteamStdResponseType<S, K>>
}

export type RequestOpts = {
  accessToken?: string | null
  apiKey?: string,
  apiVersion?: number,
  headers?: Record<string, string>,
  method?: 'GET' | 'POST',
  codec?: 'json' | 'proto'
}

export const createSteamStdAPI = <T extends ServiceDict>(serviceName: T, token?: string) => {
  let ak = token
  return new Proxy<SteamHTTPAPI<T>>({} as any, {
    get: <M extends ServiceMethodDict<T>>(target: any, serviceMethod: M) => {
      // make serviceMethod First Letter to UpperCase
      let s = serviceMethod.charAt(0).toUpperCase() + serviceMethod.slice(1) as M
      return (param:InferReqType<T, M>, requestOpts?: RequestOpts) => callHttpSteamStdAPI({
        apiVersion: requestOpts?.apiVersion,
        headers: requestOpts?.headers,
        serviceName,
        serviceMethod: s,
        accessToken: requestOpts?.accessToken ?? ak,
        apiKey: requestOpts?.apiKey,
        requestData: param,
        method: requestOpts?.method,
        codec: requestOpts?.codec,
      })
    }
  })
}