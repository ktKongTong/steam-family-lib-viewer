import type {
  CFamilyGroups_PlaytimeEntry, InferRespType,
} from "@repo/steam-proto";
import { f } from '@/lib/omfetch'
import _ from "lodash";

import {logger} from '@/lib/logger'
import React from "react";
import { shaDigestAvatarBase64ToStrAvatarHash } from "@repo/shared";

import Graph from "@/app/render/graph";
import {Player} from "@/interface/steamPlaytime";


export const dynamic = 'force-dynamic'

export const revalidate = 3600

let host = process.env.BASE_URL as string
async function fetchFamilyInfo(token:string) {
  return await f.get<InferRespType<'FamilyGroups', 'GetFamilyGroupForUser'>>(`${host}/api/steam/family?access_token=${token}`)
    .catch(e=> {
      logger.log(e)
      return null
    })
}
async function fetchFamilyPlayTime(token:string,id:string) {
  let url = `${host}/api/steam/family/playtime/${id}?access_token=${token}`
  const data = await f.get<InferRespType<'FamilyGroups', 'GetPlaytimeSummary'>>(url)
    .catch(e=> {
      logger.log(e)
      return null
    })
  const appids:number[] = data?.entries!.flatMap((it)=>it.appid!)!
  const appidsByOwner = data?.entriesByOwner!.flatMap((it) => it.appid!)!
  const allIds = _.uniq(appids.concat(appidsByOwner))
  const appPlaytimeDict = _.groupBy(data?.entries,'appid')
  const appPlaytimeByOwnerDict = _.groupBy(data?.entriesByOwner, 'appid')
  return allIds.map(id=> {
    let res:any[] = []
    let owners = appPlaytimeByOwnerDict[id]
    let players = appPlaytimeDict[id]
    if(owners) {
      res = res.concat(owners.map(owner => ({...owner, isOwner: true}))
      )
    }
    if(players) {
      res = res.concat(players.map(player => ({...player, isOwner: false})))
    }
    return {
      appid: id,
      players: res as (CFamilyGroups_PlaytimeEntry & {isOwner:boolean})[],
    }
  })
}
async function fetchFamilyMembers(token:string,ids:string[]){
  const data = await f.get<InferRespType<'Player', 'GetPlayerLinkDetails'>>(`${host}/api/steam/player/${ids.join(',')}?access_token=${token}`)
    .catch(e=> {
      logger.log(e)
      return null
    })
  return data
}

async function fetchFamilySharedLibs(token:string,id:string){
  const data = await f.get<InferRespType<'FamilyGroups', 'GetSharedLibraryApps'>>(`${host}/api/steam/family/shared/${id}?access_token=${token}`)
    .catch(e=> {
      logger.log(e)
      return null
    })
  return data
}

async function fetchFamilyLibItems(ids:string[]){
  const data = await f.get<InferRespType<'StoreBrowse', 'GetItems'>>(`${host}/api/steam/items/${ids.join(',')}`)
    .catch(e=> {
      logger.log(e)
      return null
    })
  return data
}
async function getRandomBackground(){
  const data = await fetch(`https://moe.jitsu.top/img/?type=json`, {
    cache:'no-cache'
  })
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  if(data == null) {
    return "https://moe.jitsu.top/img"
  }
  return data.pics[0] as string
}


async function prepareData(accessToken:string) {
  const bg = getRandomBackground()
  const familyInfo = await fetchFamilyInfo(accessToken)
  let familyData = familyInfo?.familyGroup!
  const memberIds = familyData.members!.map((member)=>member.steamid!.toString())
  const memberFamilyInfos = _.keyBy(familyData.members, 'steamid')

  let familyGroupId = familyInfo?.familyGroupid

  const [libsPlaytimeSummary,libOverviewInfos,memberInfos] = await Promise.all([
    fetchFamilyPlayTime(accessToken, familyGroupId!.toString()),
    fetchFamilySharedLibs(accessToken, familyGroupId!.toString()),
    fetchFamilyMembers(accessToken, memberIds)
  ])

  const members = memberInfos!!.accounts.map((account)=> {
    const id = account?.publicData?.steamid! as unknown as string
    const avatar_hash = shaDigestAvatarBase64ToStrAvatarHash(account!.publicData!.shaDigestAvatar!.toString())
    return {
      ...account.publicData,
      avatar_hash,
      ...memberFamilyInfos[id]
    }
  })
  const memberDict = _.keyBy(members, 'steamid')
  const libs = libOverviewInfos!.apps!
    .filter( (app) => app.excludeReason == undefined || app.excludeReason == 0)


  const libIds:string[][] = _.chunk(libs.map((it:any)=>it.appid.toString()), 30)
  const res = await Promise.all(libIds.map(async (idChunk,index) => {
    const res = await fetchFamilyLibItems(idChunk)
    return res
  }))
  const items = res
    .filter((it,index) => {
      return !(!it || it!.storeItems!.length == 0);
    })
    .map(resp=>resp!.storeItems).flatMap(it=>it)
  const libDictionary = _.keyBy(items, 'id')
  const allLib = libs.map((lib)=> ({
    ...lib,
    detail: libDictionary[lib.appid!],
    owners:lib.ownerSteamids.map((id) => {
      return memberDict[id.toString()]
    })
  }))
  const background = await bg
  return {
    allLib,
    libDictionary,
    members,
    libsPlaytimeSummary,
    familyInfo,
    background
  }
}

export default async function Page({
  searchParams
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const token = searchParams['access_token']

  const {
    allLib,
    libDictionary,
    members,
    libsPlaytimeSummary,
    familyInfo,
    background
  } = await prepareData(token as string)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Graph
        libs={allLib}
        players={members as Player[]}
        libsPlaytime={libsPlaytimeSummary}
        family={familyInfo}
        bg={background}
      />
    </main>
  )

}