
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

