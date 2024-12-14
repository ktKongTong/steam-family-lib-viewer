import { EResult } from "../../enums/std-err-result";
import { InferSteamStdReqOrRespJsonType, InferSteamStdReqOrRespType } from "../gen";
import {ServiceDict, ServiceMethodDict} from "./base";

export type APICallClazzType<S extends ServiceDict, M extends ServiceMethodDict<S>> = {
  reqSchema: any
  respSchema: any
}


export type InferReqType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>
> = Omit<InferSteamStdReqOrRespType<S, M, 'Request'>, '$typeName'>


export type InferRespType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>,
> = InferSteamStdReqOrRespType<S, M, 'Response'>


export type InferReqJsonType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>
> = InferSteamStdReqOrRespJsonType<S, M, 'Request'>


export type InferRespJsonType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>,
> = InferSteamStdReqOrRespJsonType<S, M, 'Response'>

export type SteamStdRequestJsonType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>
> = {
  apiVersion?: 1 | 2 | 3 | number,
  serviceName: S,
  serviceMethod: M,
  requestData: InferReqJsonType<S, M>,
  accessToken?: string,
  apiKey?: string,
  headers?: Record<string, string>
}
export type SteamStdRequestType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>
> = {
  apiVersion?: 1 | 2 | 3 | number,
  serviceName: S,
  serviceMethod: M,
  requestData: InferReqType<S, M>,
  accessToken?: string,
  apiKey?: string,
  headers?: Record<string, string>
}

export type SteamStdResponseJsonType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>
> = {
  data: undefined,
  success: false
  result?: EResult
  errorMessage?: string
} | {
  data: InferRespJsonType<S, M>,
  success: true
  result?: EResult
  errorMessage?: string
}
export type SteamStdResponseType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>
> = {
  data: undefined,
  success: false
  result?: EResult
  errorMessage?: string
} | {
  data: InferRespType<S, M>,
  success: true
  result?: EResult
  errorMessage?: string
}

export type SteamAPICallFn = <
  T extends ServiceDict,
  M extends ServiceMethodDict<T>
>(param: SteamStdRequestType<T, M>)=> Promise<SteamStdResponseType<T, M>>