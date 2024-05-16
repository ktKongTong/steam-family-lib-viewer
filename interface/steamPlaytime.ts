export interface SteamPlaytimeResponse {
  data: {
    entries: SteamPlaytimeItem[],
    entriesByOwner: SteamPlaytimeItem[]
  }
}
export interface SteamPlaytimeItem {
  steamid: string,
  appid: number,
  firstPlayed: number,
  lastPlayed: number,
  secondsPlayed: number
}

export interface ExtendedSteamPlaytimeItem extends SteamPlaytimeItem {
  isOwner: boolean
}

export interface SteamAppPlaytime {
  appid: number,
  players: ExtendedSteamPlaytimeItem[]
}