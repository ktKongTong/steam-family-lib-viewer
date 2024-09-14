import {
  CFamilyGroups_GetSharedLibraryApps_Response_SharedApp,
  CFamilyGroups_PlaytimeEntry,
  FamilyGroupMember
} from "@/proto/gen/web-ui/service_familygroups_pb";
import {
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicData
} from "@/proto/gen/web-ui/service_player_pb";
import {StoreItem} from "@/proto/gen/web-ui/common_pb";

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
