import {Message, PartialMessage} from "@bufbuild/protobuf";
import { EResult } from "../enums/std-err-result";
import {steamStdServiceRecord, InferSteamStdReqOrRespTypeFromString, steamStdServiceClazzMap} from "./gen";


type SteamServiceName<T extends string = string> = T

type InferServiceName<T extends SteamStdService> = T extends `I${infer S}Service` ? S : never;
type SteamStdService<T extends string = string> = `I${T}Service`

type SteamStdMethod<T extends string = string> = T

type InferSteamStdResponseTypeName<S extends SteamStdService = SteamStdService, M extends SteamStdMethod = SteamStdMethod> = `C${S extends SteamStdService<infer Ser> ? Ser : never}_${M}_Response`
type InferSteamStdRequestTypeName<S extends SteamStdService = SteamStdService, M extends SteamStdMethod = SteamStdMethod> = `C${S extends SteamStdService<infer Ser> ? Ser : never}_${M}_Request`

export type LooseInferSteamStdRequestTypeName<T extends string | SteamStdService, M extends SteamStdMethod> =
  T extends SteamStdService ? InferSteamStdRequestTypeName<T, M>
    : T extends string ? InferSteamStdRequestTypeName<SteamStdService<T>, M>
      : never

export type LooseInferSteamStdResponseTypeName<T extends string | SteamStdService, M extends SteamStdMethod> =
  T extends SteamStdService ? InferSteamStdResponseTypeName<T, M>
    : T extends string ? InferSteamStdResponseTypeName<SteamStdService<T>, M>
      : never

export type InferSteamStdTypeName<T extends SteamStdService, M extends SteamStdMethod> =
  InferSteamStdResponseTypeName<T, M> | InferSteamStdRequestTypeName<T, M>

type LooseInferSteamStdTypeName<T extends string | SteamStdService, M extends SteamStdMethod> =
  LooseInferSteamStdResponseTypeName<T, M> | LooseInferSteamStdRequestTypeName<T, M>


export type NewInferSteamStdRequestTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> = `C${S}_${M}_Request`

export type NewInferSteamStdResponseTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> = `C${S}_${M}_Response`







export type ServiceDict = keyof typeof steamStdServiceRecord
export type ServiceMethodDict<T extends ServiceDict> = (typeof steamStdServiceRecord)[T][number]

// export type ServiceDict = keyof typeof steamStdServiceClazzMap
// export type ServiceMethodDict<T extends ServiceDict> = keyof (typeof steamStdServiceClazzMap)[T]

export type SteamAPICallPrefix<S extends ServiceDict, M extends ServiceMethodDict<S>> = `C${S}_${M}`

export type SteamAPITypeName<S extends ServiceDict, M extends ServiceMethodDict<S>, Type extends 'Request' | 'Response'> = `${SteamAPICallPrefix<S, M>}_${Type}`
export type SteamAPIRequestTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> = `${SteamAPICallPrefix<S, M>}_Request`

export type SteamAPIResponseTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> = `${SteamAPICallPrefix<S, M>}_Response`


export type InferAPICallTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> =
  SteamAPIRequestTypeName<S, M> | SteamAPIResponseTypeName<S, M>

type MatrixMethod<T extends ServiceDict> = { [K in ServiceMethodDict<T>]: InferAPICallTypeName<T,K> }[ServiceMethodDict<T>]

export type AllRTypeDict = { [K in ServiceDict]: MatrixMethod<K> }[ServiceDict]


type SteamStdTypeNameDict = AllRTypeDict

type InferPartialMessageType<T> = T extends Message<any> ? PartialMessage<T> : never;
type InferMessageType<T> = T extends Message<infer R> ? R : never;
export type InferPartialMessage<T extends SteamStdTypeNameDict> =
  T extends `${string}_Response` ? InferMessageType<InferSteamStdReqOrRespTypeFromString<T>>
  //   for request use partial
  : T extends `${string}_Request` ? InferPartialMessageType<InferSteamStdReqOrRespTypeFromString<T>>
  : never

// @ts-ignore
export type SteamStdRequestDataType<S extends ServiceDict, M extends ServiceMethodDict<S>> = InferSteamStdReqOrRespTypeFromString<SteamAPIRequestTypeName<S, M>>
// @ts-ignore
export type SteamStdResponseDataType<S extends ServiceDict, M extends ServiceMethodDict<S>> = InferSteamStdReqOrRespTypeFromString<SteamAPIRequestTypeName<S, M>>

export type APICallClazzType<S extends ServiceDict, M extends ServiceMethodDict<S>> = {
  reqClazz: SteamStdRequestDataType<S, M>,
  respClazz: SteamStdResponseDataType<S, M>
}


export type InferRespType<
  T extends ServiceDict,
  M extends ServiceMethodDict<T>
// @ts-ignore
> = InferPartialMessage<SteamAPIResponseTypeName<T, M>>


export type InferReqType<
  T extends ServiceDict,
  M extends ServiceMethodDict<T>
// @ts-ignore
> = InferPartialMessage<SteamAPIRequestTypeName<T, M>>


export type SteamStdRequestType<
  S extends ServiceDict,
  M extends ServiceMethodDict<S>
> = {
  apiVersion?: 1 | 2 | 3 | number,
  serviceName: S,
  serviceMethod: M,
  // @ts-ignore
  requestData: InferPartialMessage<SteamAPIRequestTypeName<S, M>>,
  accessToken?: string,
  headers?: Record<string, string>
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
  // @ts-ignore
  data: InferPartialMessage<SteamAPIResponseTypeName<S, M>>,
  success: true
  result?: EResult
  errorMessage?: string
}

export type SteamAPICallFn = <
  T extends ServiceDict,
  M extends ServiceMethodDict<T>
>(param: SteamStdRequestType<T, M>)=> Promise<SteamStdResponseType<T, M>>
