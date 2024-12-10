
import {createSteamStdAPI, RequestOpts, SteamHTTPServiceAPI} from "./http-transport";
import {InferReqType, ServiceDict, ServiceMethodDict, SteamStdResponseType} from "../types";

// const FamilyGroupApi = createSteamStdAPI('FamilyGroups')
// const AuthenticationApi = createSteamStdAPI('Authentication')
// const AccountPrivateAppsApi = createSteamStdAPI('AccountPrivateApps')
// const PlayerAPI = createSteamStdAPI('Player')
// const StoreBrowseAPI = createSteamStdAPI('StoreBrowse')
// const StoreAPI = createSteamStdAPI('Store')
// const ClientCommAPI = createSteamStdAPI('ClientComm')

// export const steamWebStdAPI = {
//   auth: AuthenticationApi,
//   familyGroup: FamilyGroupApi,
//   accountPrivate: AccountPrivateAppsApi,
//   player: PlayerAPI,
//   store: StoreAPI,
//   clientComm: ClientCommAPI,
//   storeBrowse: StoreBrowseAPI,
// }



export const steamWebStdAPI = new Proxy<SteamHTTPServiceAPI>({} as any, {
  get: <S extends ServiceDict>(target: any, serviceName: S) => {
    let s = serviceName.charAt(0).toUpperCase() + serviceName.slice(1) as S
    return createSteamStdAPI(s)
  }
})