import {
  CAuthentication_AccessToken_GenerateForApp_Request, CAuthentication_AccessToken_GenerateForApp_Response,
  CAuthentication_BeginAuthSessionViaQR_Request,
  CAuthentication_BeginAuthSessionViaQR_Response,
  CAuthentication_PollAuthSessionStatus_Request,
  CAuthentication_PollAuthSessionStatus_Response
} from "../proto";
import type {PartialMessage} from "@bufbuild/protobuf";
import {SteamAPICall} from "./steam-request";

export class SteamAuthApi {
  private readonly accessToken: string|undefined
  constructor(accessToken?:string) {
    this.accessToken = accessToken
  }

  pollAuthSessionStatus(param: PartialMessage<CAuthentication_PollAuthSessionStatus_Request>) {
    return SteamAPICall({
      method: "POST",
      serviceName: "IAuthenticationService",
      itemName: "PollAuthSessionStatus",
      reqClass: CAuthentication_PollAuthSessionStatus_Request,
      respClass: CAuthentication_PollAuthSessionStatus_Response,
      param: param
    })
  }

  beginAuthSessionViaQR(param: PartialMessage<CAuthentication_BeginAuthSessionViaQR_Request>) {
    return SteamAPICall({
      method: "POST",
      serviceName: "IAuthenticationService",
      itemName: "BeginAuthSessionViaQR",
      reqClass: CAuthentication_BeginAuthSessionViaQR_Request,
      respClass: CAuthentication_BeginAuthSessionViaQR_Response,
      param: param
    })
  }

  generateAccessToken(param: PartialMessage<CAuthentication_AccessToken_GenerateForApp_Request>) {
    return SteamAPICall({
      method: "POST",
      serviceName: "IAuthenticationService",
      itemName: "GenerateAccessTokenForApp",
      reqClass: CAuthentication_AccessToken_GenerateForApp_Request,
      respClass: CAuthentication_AccessToken_GenerateForApp_Response,
      param: param
    })
  }
}