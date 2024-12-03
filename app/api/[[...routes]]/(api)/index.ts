import {SteamAuthApi} from "./auth-api";
import {SteamFamilyGroupApi} from "./steam-family-group-api";
import {SteamCommonApi} from "./common-api";
import {SteamAccountPrivateAppApi} from "@/app/api/[[...routes]]/(api)/account-api";


export class SteamAPI {
  private readonly accessToken: string|undefined
  readonly auth: SteamAuthApi
  readonly familyGroup: SteamFamilyGroupApi
  readonly common: SteamCommonApi
  readonly accountPrivate: SteamAccountPrivateAppApi
  constructor(accessToken?:string) {
    this.accessToken = accessToken
    this.auth = new SteamAuthApi()
    this.familyGroup = new SteamFamilyGroupApi()
    this.common = new SteamCommonApi()
    this.accountPrivate = new SteamAccountPrivateAppApi()
  }
}

export const steamAPI = new SteamAPI()