import {
  CFamilyGroups_ClearCooldownSkip_Request, CFamilyGroups_ClearCooldownSkip_Response,
  CFamilyGroups_GetFamilyGroupForUser_Request,
  CFamilyGroups_GetFamilyGroupForUser_Response,
  CFamilyGroups_GetPlaytimeSummary_Request,
  CFamilyGroups_GetPlaytimeSummary_Response,
  CFamilyGroups_GetPreferredLenders_Request,
  CFamilyGroups_GetPreferredLenders_Response,
  CFamilyGroups_GetSharedLibraryApps_Request,
  CFamilyGroups_GetSharedLibraryApps_Response,
  CFamilyGroups_SetFamilyCooldownOverrides_Request,
  CFamilyGroups_SetFamilyCooldownOverrides_Response
} from "../proto";
import type {PartialMessage} from "@bufbuild/protobuf";
import {SteamAPICall} from "./steam-request";

export class SteamFamilyGroupApi {
  private readonly accessToken: string|undefined
  constructor(accessToken?:string) {
    this.accessToken = accessToken
  }
  getFamilyGroupShardLibrary(param: PartialMessage<CFamilyGroups_GetSharedLibraryApps_Request>,token?: string) {
    return SteamAPICall({
      method: "GET",
      serviceName: "IFamilyGroupsService",
      itemName: "GetSharedLibraryApps",
      token: token ?? this.accessToken,
      reqClass: CFamilyGroups_GetSharedLibraryApps_Request,
      respClass: CFamilyGroups_GetSharedLibraryApps_Response,
      param: param
    })
  }

  getFamilyGroupPlaytimeSummary(param: PartialMessage<CFamilyGroups_GetPlaytimeSummary_Request>,token?: string) {
    return SteamAPICall({
      method: "POST",
      serviceName: "IFamilyGroupsService",
      itemName: "GetPlaytimeSummary",
      token: token ?? this.accessToken,
      reqClass: CFamilyGroups_GetPlaytimeSummary_Request,
      respClass: CFamilyGroups_GetPlaytimeSummary_Response,
      param: param
    })
  }

  getFamilyGroupPreferredLenders(param:PartialMessage<CFamilyGroups_GetPreferredLenders_Request>,token?: string) {
    return SteamAPICall({
      method: "GET",
      serviceName: "IFamilyGroupsService",
      itemName: "GetPreferredLenders",
      token: token ?? this.accessToken,
      useBuf: false,
      reqClass: CFamilyGroups_GetPreferredLenders_Request,
      respClass: CFamilyGroups_GetPreferredLenders_Response,
      param: param
    })
  }


  getFamilyGroupForUser(param:PartialMessage<CFamilyGroups_GetFamilyGroupForUser_Request>,token?: string) {
    return  SteamAPICall({
      method: "GET",
      serviceName: "IFamilyGroupsService",
      itemName: "GetFamilyGroupForUser",
      token: token ?? this.accessToken,
      reqClass: CFamilyGroups_GetFamilyGroupForUser_Request,
      respClass: CFamilyGroups_GetFamilyGroupForUser_Response,
      param: param
    })
  }


  setFamilyCooldownOverrides(param:PartialMessage<CFamilyGroups_SetFamilyCooldownOverrides_Request>,token?: string) {
    return SteamAPICall({
      method: "POST",
      serviceName: "IFamilyGroupsService",
      itemName: "SetFamilyCooldownOverrides",
      token: token ?? this.accessToken,
      reqClass: CFamilyGroups_SetFamilyCooldownOverrides_Request,
      respClass: CFamilyGroups_SetFamilyCooldownOverrides_Response,
      param: param
    })
  }


  clearCooldownSkip(param:PartialMessage<CFamilyGroups_ClearCooldownSkip_Request>,token?: string) {
    return SteamAPICall({
      method: "POST",
      serviceName: "IFamilyGroupsService",
      itemName: "ClearCooldownSkip",
      token: token ?? this.accessToken,
      reqClass: CFamilyGroups_ClearCooldownSkip_Request,
      respClass: CFamilyGroups_ClearCooldownSkip_Response,
      param: param
    })
  }

}