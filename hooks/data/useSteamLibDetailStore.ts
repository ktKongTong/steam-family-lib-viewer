
// lib
// name, price, tags, createdAt, country


interface SteamLibDetailStore {
  libs: any[]
}
interface SteamLibDetailAction {
  getSteamLibDetailById(appid: string) : any | null
  isAppExists(appid: string): boolean
  addAppDetail(apps: any[]): void
}

export const useSteamLibDetailStore = () => {




}


export const useSteamLibDetail = (appid: string) => {

  // if appId exist
  // el
  return null
}

