import {SteamCommonApi} from "./common-api";

class SteamAPI {
  private readonly accessToken: string|undefined
  readonly common: SteamCommonApi
  constructor(accessToken?:string) {
    this.accessToken = accessToken
    this.common = new SteamCommonApi()
  }
}

export const steamCrawlAPI = new SteamAPI()