import {callHttpSteamStdAPI} from "./std";
import type {InferReqType } from "./std";



export class SteamAuthApi {
  private readonly accessToken: string|undefined
  constructor(accessToken?:string) {
    this.accessToken = accessToken
  }

  pollAuthSessionStatus(param: InferReqType<'Authentication', 'PollAuthSessionStatus'>) {
    return callHttpSteamStdAPI({
      serviceName: "Authentication",
      serviceMethod: "PollAuthSessionStatus",
      requestData: param
    })
  }

  beginAuthSessionViaQR(param: InferReqType<'Authentication', 'BeginAuthSessionViaQR'>) {
    return callHttpSteamStdAPI({
      serviceName: "Authentication",
      serviceMethod: "BeginAuthSessionViaQR",
      requestData: param
    })
  }

  generateAccessToken(param: InferReqType<'Authentication', 'AccessToken_GenerateForApp'>) {
    return callHttpSteamStdAPI({
      serviceName: "Authentication",
      serviceMethod: "AccessToken_GenerateForApp",
      requestData: param
    })
  }
}
