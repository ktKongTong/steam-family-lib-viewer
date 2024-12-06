import { callHttpSteamStdAPI } from "./std";
import { InferReqType } from "./std";
export class SteamFamilyGroupApi<T extends 'FamilyGroups' = 'FamilyGroups'> {

  private readonly accessToken: string|undefined
  constructor(accessToken?:string) {
    this.accessToken = accessToken
  }
  getFamilyGroupShardLibrary = (param: InferReqType<T, 'GetSharedLibraryApps'>, token?: string) => callHttpSteamStdAPI({
    serviceName: 'FamilyGroups',
    serviceMethod: 'GetSharedLibraryApps',
    accessToken: token ?? this.accessToken,
    requestData: param,
  })

  getFamilyGroupPlaytimeSummary(param: InferReqType<T, 'GetPlaytimeSummary'>, token?: string) {
    return callHttpSteamStdAPI({
      serviceName: 'FamilyGroups',
      serviceMethod: 'GetPlaytimeSummary',
      accessToken: token ?? this.accessToken,
      requestData: param,
    })
  }

  getFamilyGroupPreferredLenders(param:InferReqType<T, 'GetPreferredLenders'>,token?: string) {
    return callHttpSteamStdAPI({
      serviceName: "FamilyGroups",
      serviceMethod: "GetPreferredLenders",
      accessToken: token ?? this.accessToken,
      codec: 'json',
      requestData: param
    })
  }


  getFamilyGroupForUser(param:InferReqType<T, 'GetFamilyGroupForUser'>,token?: string) {
    return callHttpSteamStdAPI({
      serviceName: 'FamilyGroups',
      serviceMethod: 'GetFamilyGroupForUser',
      accessToken: token ?? this.accessToken,
      requestData: param,
    })
  }


  setFamilyCooldownOverrides(param:InferReqType<T, 'SetFamilyCooldownOverrides'>,token?: string) {
    return callHttpSteamStdAPI({
      serviceName: 'FamilyGroups',
      serviceMethod: 'SetFamilyCooldownOverrides',
      accessToken: token ?? this.accessToken,
      requestData: param,
    })
  }


  clearCooldownSkip(param:InferReqType<T, 'ClearCooldownSkip'>,token?: string) {
    return callHttpSteamStdAPI({
      serviceName: 'FamilyGroups',
      serviceMethod: 'ClearCooldownSkip',
      accessToken: token ?? this.accessToken,
      requestData: param,
    })
  }
}
