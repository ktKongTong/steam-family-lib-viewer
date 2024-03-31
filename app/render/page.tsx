'use client'
import {
  CFamilyGroups_GetFamilyGroupForUser_Response,
  CFamilyGroups_GetSharedLibraryApps_Response
} from "@/proto/gen/web-ui/service_familygroups_pb";
import {jwtDecode} from "jwt-decode";
import {CPlayer_GetPlayerLinkDetails_Response} from "@/proto/gen/web-ui/service_player_pb";
import _ from "lodash";
import {StoreItem} from "@/proto/gen/web-ui/common_pb";
import {convertTag} from "@/lib/tagdict";
import ReactECharts from "echarts-for-react";
import React, {useCallback, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import WordCloud from "@/app/wordcloud";
import {shaDigestAvatarBase64ToStrAvatarHash} from "@/lib/steam_utils";

interface APIResponse<T> {
  data: T | null
}
async function getFamily(access_token:string):Promise<CFamilyGroups_GetFamilyGroupForUser_Response | null> {
  const res:APIResponse<CFamilyGroups_GetFamilyGroupForUser_Response> = await fetch(`/api/steam/family?access_token=${access_token}`)
    .then(res=>res.json())
  return res.data
}


async function getFamilySharedLib(access_token:string,familyId:string):Promise<CFamilyGroups_GetSharedLibraryApps_Response | null> {
  const res:APIResponse<CFamilyGroups_GetSharedLibraryApps_Response> = await fetch(`/api/steam/family/shared/${familyId}?access_token=${access_token}`)
    .then(res=>res.json())
  return res.data
}

async function getFamilyMembers(access_token:string,ids:string[]):Promise<CPlayer_GetPlayerLinkDetails_Response | null> {
  const res:APIResponse<CPlayer_GetPlayerLinkDetails_Response> = await fetch(`/api/steam/player/${ids.join(',')}?access_token=${access_token}`)
    .then(res=>res.json())
  return res.data
}

async function PrepareData(access_token:string) {
  // access_token
  const tokenInfo = jwtDecode(access_token??"")
  const user = tokenInfo.sub
  if(!user) {return null}
  const family = await getFamily(access_token)
  if(!family) {return null}
  const familyMemberIds = family.familyGroup?.members.map(member=>member.steamid!.toString())
  const familyId = family.familyGroupid
  if(!familyMemberIds || !familyId) {
    return
  }
  const [players,apps] = await Promise.all([
    getFamilyMembers(access_token,familyMemberIds),
    getFamilySharedLib(access_token,familyId?.toString())
  ])
  if(!players || !apps) {
    return
  }
  const games = apps.apps
    .filter(it=>it.excludeReason == undefined || it.excludeReason == 0)
    .flatMap((item) => {
    return item.ownerSteamids.map((it) => ({
      ...item,
      ownerSteamid: it,
    }))
  });



  const gameById = _.countBy(games, game=>game.ownerSteamid.toString())
  const shownApps = apps.apps
    .filter(it=>it.excludeReason == undefined || it.excludeReason == 0)
  // will cause error
  const ids = _.chunk(shownApps
    .map(it=>it.appid), 30)

  const idReq = ids.map(it=>it.join(','))
  const appInfos= await Promise.all(idReq.map(ids=>fetch(`/api/steam/items/${ids}`).then(res=>res.json()).then(json=>{
    return json.storeItems
  })))
  const items = appInfos.flatMap(appInfos=>appInfos)
  // items to dictionary
  const itemDict = new Map()

  items.forEach(item=> {
    itemDict.set(item.appid, item)
  })

  return {
    gameById,
    items,
    itemDict,
    shownApps,
    players:players.accounts
  }
}

export default function Page({
  searchParams
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const token = searchParams['access_token']
  const [dataLoaded,setDataLoaded] = useState(false)
  const [filteredPlayer, setFilteredPlayer] = useState<any[]>([])
  const { isSuccess, data:queryData, error, } = useQuery({
    queryKey: ["ids"],
    queryFn: async()=>{
      if(!token || token instanceof Array) {
        throw Error('invalid token')
      }
      const data = (await PrepareData(token))!!
      console.log("query over",data)
      setFilteredPlayer(data?.players!)
      return data!
    },
  });

  useEffect(() => {
    console.log("queryData", queryData)
    console.log(isSuccess,error)
  }, [queryData, error, isSuccess]);
  if(!isSuccess || !queryData) {
    return <div>data fetch error, {error?.message} </div>
  }
  const {
    players,
    gameById,
    items,
    shownApps,
    itemDict
  } = queryData!

  const appsForUse= shownApps.filter(item=>
    {
      return filteredPlayer.filter(player=>item.ownerSteamids.includes(player.publicData.steamid?.toString())).length > 0
    }
  ).map(app=> ({
    ...app,
    detail: itemDict.get(app.appid)
  }))

  const names =
    players.map(account=>({
      id: account.publicData?.steamid,
      name: account.publicData?.personaName
    }))

  const cntData = filteredPlayer.map(gamer => ({
    gamer,
    cnt: gameById[gamer.publicData?.steamid?.toString()!],
    name: names.find(it=>it.id?.toString() == gamer.publicData?.steamid?.toString()!)?.name
  })).sort((a,b)=>a.cnt - b.cnt)


  const tags = appsForUse
    .map(app=> app.detail)
    .map((item:StoreItem)=>item.tagids.slice(0,7)).flatMap((it:any)=>it)

  const dict = _.countBy(tags, it=>it)
  const dicts = Object.keys(dict).map(item=>({value:dict[item],text:convertTag(item)})).sort((a,b)=>b.value-a.value)

  const option =  {
    tooltip : {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: cntData.map(item=>item.name)
    },
    series : [

      {
        name: 'game amount',
        type: 'bar',
        label: {
          show: true,
          position: 'right'
        },
        data: cntData.map(item=>item.cnt)
      },
    ]
  };

  const getAvatar = (arr:Uint8Array|undefined)=> {
    if(!arr) {
      return ""
    }
    const hash = shaDigestAvatarBase64ToStrAvatarHash(arr.toString())
    return `https://avatars.akamai.steamstatic.com/${hash}_full.jpg`
  }

  const setFilterUser = (user:any) => {
    if(filteredPlayer.includes(user)) {
      setFilteredPlayer(filteredPlayer.filter(it=>it!=user))
    }else {
      setFilteredPlayer([...filteredPlayer, user])
    }
  }

  const checkActive = (user:any)=> {
    return filteredPlayer.includes(user)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        dataLoaded && (
          <>
            <div className={"flex justify-evenly items-center w-full"}>
              {players.map(player => (
                <div
                  key={player.publicData?.steamid}
                  className={`flex items-center mx-4 hover:bg-zinc-300/30 cursor-pointer rounded-lg px-4 py-2 ${checkActive(player) ? '' : 'mix-blend-color-dodge'}`}
                  onClick={() => {
                    setFilterUser(player)
                  }}
                >
                  <img src={getAvatar(player.publicData!.shaDigestAvatar)} loading={'lazy'}
                       className={'w-8 h-8 rounded-full'}/>
                  <div className={'text-xs text-zinc-700/70 pl-2'}>
                    <span>{player.publicData?.personaName}</span>
                  </div>
                </div>
              ))
              }
            </div>
            <div>
              <ReactECharts
                option={option}
                style={{height: 400, width: 800}}
              />
            </div>
            <div>
              {
                <WordCloud words={dicts} height={400} width={800} className={""}/>
              }
            </div>
          </>
        )}

    </main>)

}