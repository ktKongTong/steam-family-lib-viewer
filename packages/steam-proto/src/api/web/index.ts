
import {createSteamStdAPI} from "./http-transport";

const FamilyGroupApi = createSteamStdAPI('FamilyGroups')
const AuthenticationApi = createSteamStdAPI('Authentication')
const AccountPrivateAppsApi = createSteamStdAPI('AccountPrivateApps')
const PlayerAPI = createSteamStdAPI('Player')
const StoreBrowseAPI = createSteamStdAPI('StoreBrowse')
const StoreAPI = createSteamStdAPI('Store')
const ClientCommAPI = createSteamStdAPI('ClientComm')

export const steamWebStdAPI = {
  auth: AuthenticationApi,
  familyGroup: FamilyGroupApi,
  accountPrivate: AccountPrivateAppsApi,
  player: PlayerAPI,
  store: StoreAPI,
  clientComm: ClientCommAPI,
  storeBrowse: StoreBrowseAPI,
}