import {
  CFamilyGroups_GetSharedLibraryApps_Response_SharedApp,
  CFamilyGroups_PlaytimeEntry,
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicData,
  FamilyGroupMember,
  StoreItem
} from "@repo/steam-proto";

export interface ExtendedSteamPlaytimeItem extends CFamilyGroups_PlaytimeEntry {
  isOwner: boolean
}
export interface SteamAppPlaytime {
  appid: number,
  players: ExtendedSteamPlaytimeItem[]
}


export type Player = FamilyGroupMember & CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicData & {
  avatar_hash: string
}
export type App = CFamilyGroups_GetSharedLibraryApps_Response_SharedApp
  & { detail: StoreItem }
  & { owners: Player[] }
  & { playtime?: any }
