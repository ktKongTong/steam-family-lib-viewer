import {SteamAPICall} from "./steam-request";
import {PartialMessage} from "@bufbuild/protobuf";
import {
  CAccountPrivateApps_GetPrivateAppList_Request,
  CAccountPrivateApps_GetPrivateAppList_Response,
  CClientComm_GetAllClientLogonInfo_Request,
  CClientComm_GetAllClientLogonInfo_Response
} from "../proto";

export class SteamAccountPrivateAppApi {
  private readonly accessToken: string|undefined
  constructor(accessToken?:string) {
    this.accessToken = accessToken
  }

  getPrivateAppList(param: PartialMessage<CAccountPrivateApps_GetPrivateAppList_Request>,token?: string) {
    return SteamAPICall({
      method: "GET",
      serviceName: "IAccountPrivateAppsService",
      itemName: "GetPrivateAppList",
      token: token ?? this.accessToken,
      reqClass: CAccountPrivateApps_GetPrivateAppList_Request,
      respClass: CAccountPrivateApps_GetPrivateAppList_Response,
      param: param
    })
  }

  getAllClientLogonInfo(param: PartialMessage<CClientComm_GetAllClientLogonInfo_Request>,token?: string) {
    return SteamAPICall({
      method: "GET",
      serviceName: "IClientCommService",
      itemName: "GetAllClientLogonInfo",
      token: token ?? this.accessToken,
      reqClass: CClientComm_GetAllClientLogonInfo_Request,
      respClass: CClientComm_GetAllClientLogonInfo_Response,
      param: param
    })
  }
}