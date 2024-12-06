import {steamStdAPI} from "./base";

export class SteamAccountPrivateAppApi {
  getPrivateAppList = steamStdAPI.accountPrivate.getPrivateAppList
  getAllClientLogonInfo = steamStdAPI.clientComm.getAllClientLogonInfo
}