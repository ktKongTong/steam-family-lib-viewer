import {f} from "@/lib/omfetch";
import {CFamilyGroups_PlaytimeEntryJson, InferRespJsonType } from "@repo/steam-proto";
import {PlayerCommunityData} from "@/interface/playerStatsData";
import _ from "lodash";
import {PlayerSummariesResponse} from "@/hooks/data/query/interface";
import {PlayerStats} from "@/app/receipt/interface";
type OwnedGame = InferRespJsonType<'Player', 'GetOwnedGames'>

type NotUndefined<T> = T extends undefined ? never : T

export type LibItem = NotUndefined<OwnedGame['games']>[number]

export class APIService {
  static getOwnedGames({ apikey, steamid }:{ apikey:string, steamid:string }) {
    return f.get<OwnedGame>(`/api/steam/player/ownedGames?key=${apikey}&steamid=${steamid}`)
  }
  static getPlayerLinkDetails({ accessToken, steamids }:{ accessToken:string, steamids:string[] }) {
    return f.get<InferRespJsonType<'Player', 'GetPlayerLinkDetails'>>(`/api/steam/player/${steamids.join(',')}?access_token=${accessToken}`)
  }

  static async getPlaytimeSummary({ accessToken, familyId }:{ accessToken:string, familyId:string }) {
    const data = await f.get<InferRespJsonType<'FamilyGroups', 'GetPlaytimeSummary'>>(`/api/steam/family/playtime/${familyId}?access_token=${accessToken}`)
    return (data && calculateSharedPlaytime(data)) ?? []
  }


  static getFamilyGroupForUser(accessToken: string) {
    return f.get<InferRespJsonType<'FamilyGroups', 'GetFamilyGroupForUser'>>(`/api/steam/family?access_token=${accessToken}`)
  }
  static getSharedLibraryApps({ accessToken, familyId }:{ accessToken:string, familyId:string }){
    return  f.get<InferRespJsonType<'FamilyGroups', 'GetSharedLibraryApps'>>(`/api/steam/family/shared/${familyId}?access_token=${accessToken}`)
  }

  static getCommunityStats(id: string) {
    return f.get<PlayerCommunityData>(`/api/steam/player-community-stats/${id}`)
  }

  static getPlayerStats({ accessToken, id }:{ accessToken:string, id:string }){
    return f.get<PlayerStats>(`/api/steam/player-stats/${id}?access_token=${accessToken}`)
  }

  static getPlayerSummaries({
    apiKey,
    steamids
  }:{
    apiKey?: string,
    steamids: string[]
  }) {
    return f.get<PlayerSummariesResponse>(`/api/steam/player/summaries?steamids=${steamids.join(',')}&key=`).then(res => res.response)
  }

  static async getPlayerSummary({
    apiKey,
    steamid
  }:{
    apiKey?: string,
    steamid: string
  }) {
    const data = await f.get<PlayerSummariesResponse>(`/api/steam/player/summaries?steamids=${steamid}&key=`)
    return data?.response.players?.[0]
  }

  static getStoreItems (ids: string[]) {
    return f.get<InferRespJsonType<'StoreBrowse', 'GetItems'>>(`/api/steam/items/${ids.join(',')}`)
  }
}



interface SharedPlayTimeItem {
  appid: number,
  players: (CFamilyGroups_PlaytimeEntryJson & {isOwner:boolean})[]
}

export const calculateSharedPlaytime = (data: InferRespJsonType<'FamilyGroups', 'GetPlaytimeSummary'>) => {
  const appids = data.entries!.flatMap((it)=>it.appid!)
  const appidsByOwner = data.entriesByOwner!.flatMap((it) => it.appid!)
  const allIds = _.uniq(appids.concat(appidsByOwner))
  const appPlaytimeDict = _.groupBy(data.entries,'appid')
  const appPlaytimeByOwnerDict = _.groupBy(data.entriesByOwner, 'appid')
  return allIds.map(id=> {
    let res:any[] = []
    let owners = appPlaytimeByOwnerDict[id]
    let players = appPlaytimeDict[id]
    if(owners) {
      res = res.concat(owners.map(owner => ({...owner, isOwner: true})))
    }
    if(players) {
      res = res.concat(players.map(player => ({...player, isOwner: false})))
    }
    return {
      appid: id,
      players: res,
    } as SharedPlayTimeItem
  })
}
