import { Message } from "@bufbuild/protobuf";
import { EResult } from "../../enums/std-err-result";
import { InferSteamStdReqOrRespJsonType, InferSteamStdReqOrRespType } from "../gen";
import {ServiceDict, ServiceMethodDict} from "./base";


// type SteamStdService<T extends string = string> = `I${T}Service`
//
// type SteamStdMethod<T extends string = string> = T

// type InferSteamStdResponseTypeName<S extends SteamStdService = SteamStdService, M extends SteamStdMethod = SteamStdMethod> = `C${S extends SteamStdService<infer Ser> ? Ser : never}_${M}_Response`
// type InferSteamStdRequestTypeName<S extends SteamStdService = SteamStdService, M extends SteamStdMethod = SteamStdMethod> = `C${S extends SteamStdService<infer Ser> ? Ser : never}_${M}_Request`

// export type LooseInferSteamStdRequestTypeName<T extends string | SteamStdService, M extends SteamStdMethod> =
//   T extends SteamStdService ? InferSteamStdRequestTypeName<T, M>
//     : T extends string ? InferSteamStdRequestTypeName<SteamStdService<T>, M>
//       : never
//
// export type LooseInferSteamStdResponseTypeName<T extends string | SteamStdService, M extends SteamStdMethod> =
//   T extends SteamStdService ? InferSteamStdResponseTypeName<T, M>
//     : T extends string ? InferSteamStdResponseTypeName<SteamStdService<T>, M>
//       : never

// export type InferSteamStdTypeName<T extends SteamStdService, M extends SteamStdMethod> =
//   InferSteamStdResponseTypeName<T, M> | InferSteamStdRequestTypeName<T, M>
//
// type LooseInferSteamStdTypeName<T extends string | SteamStdService, M extends SteamStdMethod> =
//   LooseInferSteamStdResponseTypeName<T, M> | LooseInferSteamStdRequestTypeName<T, M>
//
//
// export type NewInferSteamStdRequestTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> = `C${S}_${M}_Request`
//
// export type NewInferSteamStdResponseTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> = `C${S}_${M}_Response`



// type MustStringKey<T> = T extends string ? T : never




// export type ServiceDict = keyof typeof steamStdServiceClazzMap
// export type ServiceMethodDict<T extends ServiceDict> = keyof (typeof steamStdServiceClazzMap)[T]

// export type AllRTypeDict = { [K in ServiceDict]: MatrixMethod<K> }[ServiceDict]

// type MatrixMethod<S extends ServiceDict> = {
//   [M in ServiceMethodDict<S>]: `${SteamAPICallPrefix<S, M>}_Request` |  `${SteamAPICallPrefix<S, M>}_Response`
// }[ServiceMethodDict<S>]


// export type SteamAPICallPrefix<S extends ServiceDict, M extends ServiceMethodDict<S>> = `C${S}_${M}`
//
// export type SteamAPITypeName<S extends ServiceDict, M extends ServiceMethodDict<S>, Type extends 'Request' | 'Response'> = InferSteamStdReqOrRespType<S, M, Type>
// export type SteamAPIRequestTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> = InferSteamStdReqOrRespType<S, M, 'Request'>
// export type SteamAPIResponseTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> = InferSteamStdReqOrRespType<S, M, 'Response'>


// export type InferAPICallTypeName<S extends ServiceDict, M extends ServiceMethodDict<S>> =
//   SteamAPIRequestTypeName<S, M> | SteamAPIResponseTypeName<S, M>


// type InferPartialMessageType<T> = T extends Message<any> ? PartialMessage<T> : never;
// type InferMessageType<T> = T extends Message<infer R> ? R : never;
// export type InferPartialMessage<T extends SteamStdTypeNameDict> =
//   T extends `${string}_Response` ? InferMessageType<InferSteamStdReqOrRespTypeFromString<T>>
//   //   for request use partial
//   : T extends `${string}_Request` ? InferMessageType<InferSteamStdReqOrRespTypeFromString<T>>
//   : never

// export type SteamStdRequestDataType<S extends ServiceDict, M extends ServiceMethodDict<S>> = InferSteamStdReqOrRespTypeFromString<SteamAPIRequestTypeName<S, M>>
//
// export type SteamStdResponseDataType<S extends ServiceDict, M extends ServiceMethodDict<S>> = InferSteamStdReqOrRespTypeFromString<SteamAPIRequestTypeName<S, M>>

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



type MessageFunctionKeys = keyof Message

// type PickEvenNotExist<T, K extends string> = {
//   [P in Exclude<keyof T, K>]: T[P]
// };
// type OmitMessageFunction<T> = PickEvenNotExist<T, MessageFunctionKeys>;

// serialized json
// 1. remove function
// 2. bigint -> string
// 3. uint8array -> string
// export type JsonType<T> = T extends bigint ? string
//     : T extends Uint8Array ? string
//     : T extends Function ? T
//     : T extends object ? {
//         [K in keyof OmitMessageFunction<T>]: JsonType<T[K]>;
//     }
//     : T;

// type NotFunction<T> = T extends Function ? never : T;
// export type InferJsonType<
//   S extends ServiceDict,
//   M extends ServiceMethodDict<S>
// > = JsonType<InferRespType<S, M>>