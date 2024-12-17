
import {createSteamStdAPI, RequestOpts, SteamHTTPServiceAPI} from "./http-transport";
import {InferReqType, ServiceDict, ServiceMethodDict, SteamStdResponseType} from "../types";

interface APIOpt {
  accessToken?: string,
  caller: (url: string, options: RequestInit) => Promise<Response>
}

export const createSteamWebStdAPI = (opt?: APIOpt) => {
  return new Proxy<SteamHTTPServiceAPI>({} as any, {
    get: <S extends ServiceDict>(target: any, serviceName: S) => {
      let s = serviceName.charAt(0).toUpperCase() + serviceName.slice(1) as S
      return createSteamStdAPI(s, {
        accessToken: opt?.accessToken,
        apiCaller: opt?.caller
      })
    }
  })
}

export const steamWebStdAPI = createSteamWebStdAPI()