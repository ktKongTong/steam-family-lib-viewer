import {
  CFamilyGroups_GetFamilyGroupForUser_Response, CFamilyGroups_GetPlaytimeSummary_Response,
  CFamilyGroups_GetSharedLibraryApps_Response, CFamilyGroups_PlaytimeEntry
} from "@/proto/gen/web-ui/service_familygroups_pb";
import _ from "lodash";
import {CStoreBrowse_GetItems_Response} from "@/proto/gen/web-ui/common_pb";

import React from "react";
import {shaDigestAvatarBase64ToStrAvatarHash} from "@/lib/steam_utils";
import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {Player} from "@/app/page";
import DataGraph from "@/app/datagraph";
import Graph from "@/app/render/graph";

let host = "http://localhost:3000"
async function fetchFamilyInfo(token:string):Promise<null| ProxiedAPIResponse<CFamilyGroups_GetFamilyGroupForUser_Response>>{
  const data = await fetch(`${host}/api/steam/family?access_token=${token}`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}
async function fetchFamilyPlayTime(token:string,id:string) {
  let url = `${host}/api/steam/family/playtime/${id}?access_token=${token}`
  const data = (await fetch(url)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })) as ProxiedAPIResponse<CFamilyGroups_GetPlaytimeSummary_Response>
  console.log(data.data)
  const appids:number[] = data.data!.entries.flatMap((it:any)=>it.appid)
  const appidsByOwner = data.data!.entriesByOwner.flatMap(it => it.appid!)
  const allIds = _.uniq(appids.concat(appidsByOwner))
  const appPlaytimeDict = _.groupBy(data.data!.entries,'appid')
  const appPlaytimeByOwnerDict = _.groupBy(data.data!.entriesByOwner, 'appid')
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
  const data = await fetch(`${host}/api/steam/player/${ids.join(',')}?access_token=${token}`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}

async function fetchFamilySharedLibs(token:string,id:string){
  const data = await fetch(`${host}/api/steam/family/shared/${id}?access_token=${token}`)
    .then(res=>res.json() as Promise<ProxiedAPIResponse<CFamilyGroups_GetSharedLibraryApps_Response>>)
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}

async function fetchFamilyLibItems(ids:string[]){
  const data = await fetch(`${host}/api/steam/items/${ids.join(',')}`)
    .then(res=>res.json() as Promise<ProxiedAPIResponse<CStoreBrowse_GetItems_Response>>)
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}
async function getRandomBackground(){
  const data = await fetch(`https://moe.jitsu.top/img/?type=json`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data.pics[0] as string
}


async function prepareData(accessToken:string) {
  const bg = getRandomBackground()
  const familyInfo = await fetchFamilyInfo(accessToken)
  let familyData = familyInfo?.data?.familyGroup!
  const memberIds = familyData.members!.map((member)=>member.steamid!.toString())
  const memberFamilyInfos = _.keyBy(familyData.members, 'steamid')

  let familyGroupId = familyInfo?.data?.familyGroupid

  const [libsPlaytimeSummary,libOverviewInfos,memberInfos] = await Promise.all([
    fetchFamilyPlayTime(accessToken, familyGroupId!.toString()),
    fetchFamilySharedLibs(accessToken, familyGroupId!.toString()),
    fetchFamilyMembers(accessToken, memberIds)
  ])

  const members:Player[] = memberInfos.data.accounts.map((account:any)=> {
    const id = account?.publicData?.steamid!
    const avatar_hash = shaDigestAvatarBase64ToStrAvatarHash(account?.publicData?.shaDigestAvatar?.toString())
    return {
      ...account.publicData,
      avatar_hash,
      ...memberFamilyInfos[id]
    }
  })
  const memberDict = _.keyBy(members, 'steamid')
  const libs = libOverviewInfos!.data!.apps
    .filter( (app) => app.excludeReason == undefined || app.excludeReason == 0)


  const libIds:string[][] = _.chunk(libs.map((it:any)=>it.appid.toString()), 30)
  const res = await Promise.all(libIds.map(async (idChunk,index) => {
    const res = await fetchFamilyLibItems(idChunk)
    return res
  }))
  const items = res
    .filter((it,index) => {
      return !(!it || it.data!.storeItems.length == 0);
    })
    .map(resp=>resp!.data!.storeItems).flatMap(it=>it)
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
        players={members}
        libsPlaytime={libsPlaytimeSummary}
        family={familyInfo}
        bg={background}
      />
    </main>
  )

}