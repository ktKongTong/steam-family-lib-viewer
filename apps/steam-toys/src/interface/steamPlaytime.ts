import {
  CFamilyGroups_GetSharedLibraryApps_Response_SharedAppJson,
  CFamilyGroups_PlaytimeEntryJson,
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicDataJson,
  FamilyGroupMemberJson,
  StoreItemJson
} from "@repo/steam-proto";

export interface ExtendedSteamPlaytimeItem extends CFamilyGroups_PlaytimeEntryJson {
  isOwner: boolean
}
export interface SteamAppPlaytime {
  appid: number,
  players: ExtendedSteamPlaytimeItem[]
}


export type Player = FamilyGroupMemberJson & CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicDataJson & {
  avatar_hash: string
}
export type App = CFamilyGroups_GetSharedLibraryApps_Response_SharedAppJson
  & { detail: StoreItemJson }
  & { owners: Player[] }
  & { playtime?: any }
