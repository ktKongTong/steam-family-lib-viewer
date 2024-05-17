'use client'
import dayjs from "dayjs";
import {Piegraph} from "@/app/piegraph";
import {PlaytimeGraph} from "@/app/playtimeGraph";
import WordCloud from "@/app/wordcloud";
import React, {useMemo, useState} from "react";
import {Player} from "@/app/page";
import {SteamAppPlaytime} from "@/interface/steamPlaytime";
import _ from "lodash";
import {StoreItem} from "@/proto/gen/web-ui/common_pb";
import {convertTag} from "@/lib/tagdict";
import GamesGrid from "@/app/games-grid";
import Game from "@/app/game";


const useComputed = (
  libs: any[],
  filteredPlayer: any[],
  players: Player[],
  libsPlaytime: SteamAppPlaytime[]
)=> {
  const names = useMemo(()=>players.map(account=>({
    id: account.steamid,
    name: account.personaName
  })),[players])
  const libPlaytimePlayerSummary = _.keyBy(libsPlaytime, 'appid')
  const appsForUse= useMemo(()=>libs
      .filter(item=>
        {
          return filteredPlayer.filter(player=>item.ownerSteamids.includes(player.steamid)).length > 0
        }
      ).sort((a,b)=>b.rtTimeAcquired - a.rtTimeAcquired)
      .map(item=> {
        return {
          playtime: libPlaytimePlayerSummary[item.appid],
          ...item
        }
      })
    ,[filteredPlayer, libPlaytimePlayerSummary, libs])
  const games = useMemo(()=>appsForUse
    .flatMap((item) => {
      return item.ownerSteamids.map((it:any) => ({
        ...item,
        ownerSteamid: it,
      }))
    }),[appsForUse])

  const gameById = useMemo(()=>_.countBy(games, game=>game.ownerSteamid.toString()),
    [games])

  const cntData = useMemo(()=>filteredPlayer.map(gamer => ({
      gamer,
      cnt: gameById[gamer.steamid?.toString()!],
      name: names.find(it=>it.id?.toString() == gamer.steamid?.toString()!)?.name
    }))
      .sort((a,b)=>a.cnt - b.cnt),
    [filteredPlayer, gameById, names])


  const tags = useMemo(()=>appsForUse
      .map(app=> app.detail)
      .flatMap((item:StoreItem)=>item.tagids.slice(0,10)),
    [appsForUse])

  const dict = useMemo(()=>_.countBy(tags, it=>it),[tags])
  const dicts = useMemo(()=>Object
      .keys(dict)
      .map(item=>({value:dict[item],text:convertTag(item)}))
      .sort((a,b)=>b.value-a.value)
    ,[dict])

  const allPlayTimeData = libsPlaytime.flatMap(it => it.players)
  const playersPlayData = _.groupBy(allPlayTimeData,'steamid')
  const playtimeData = _.keys(playersPlayData).map(key=> {
    const it = playersPlayData[key]
    const asOwnerLendTime = it.filter(item=> item.isOwner).reduce((acc,cur) => acc + cur.secondsPlayed!,0)
    const asPlayerTime = it.filter(item=> !item.isOwner).reduce((acc,cur) => acc + cur.secondsPlayed!,0)
    return {
      asOwnerLendTime,
      asPlayerTime,
      steamid: key
    }
  })
  const recentLibs = appsForUse
    .sort((a,b)=> {return (b.rtTimeAcquired ?? 0) - (a.rtTimeAcquired ?? 0)})
    .slice(0,12)
  return {
    cntData,
    dicts,
    playtimeData,
    appsForUse,
    recentLibs
  }
}

const durationTostring= (duration:number)=> {
  if(duration == 0) return "暂无冷静期"
  if(duration < (24 * 3600)) {
    return "冷静期剩余" + (duration/3600).toFixed(0) + "小时"
  }
  return "冷静期剩余"+ (duration / (24 * 3600)).toFixed(0) + "天"
}

export default function Graph({
  libs,
  players,
  libsPlaytime,
  family,
  bg
}:{
  libs: any[],
  players: Player[],
  libsPlaytime: SteamAppPlaytime[],
  family: any,
  bg: string
}) {
  const [filteredPlayer, setFilteredPlayer] = useState<any[]>(players)
  const {
    cntData,
    dicts,
    playtimeData,
    appsForUse,
    recentLibs
  } = useComputed(libs,filteredPlayer,players, libsPlaytime)

  return (
    <div className={"relative z-10 overflow-hidden rounded-lg"} id={'data-graph'}>
      <div
        className={'bg-blend-darken dark bg-black/[.6] z-10 rounded-lg flex flex-col items-center justify-center mx-auto space-y-2 p-1 md:p-4'}>
        <div className={"text-xl text-white  mx-auto"}> {family.data.familyGroup.name}</div>
        <div className={"grid grid-cols-2 sm:grid-cols-3 justify-evenly items-center w-full gap-1"}>
          {
            players.map(player => (
              <div
                key={player.steamid}
                className={`flex dark items-center mx-4 hover:bg-zinc-700/30 cursor-pointer rounded-lg px-1 py-0.5 sm:px-4 sm:py-2`}
              >
                <img
                  src={`https://avatars.akamai.steamstatic.com/${player.avatar_hash}_full.jpg`}
                  loading={'lazy'}
                  className={`w-8 h-8 rounded-full`}/>
                <div className={'text-xs text-zinc-100/70 pl-2 flex flex-col'}>
                  <span>{player.personaName}</span>
                  <span
                    className={'text-xs opacity-50'}>{durationTostring(player.cooldownSecondsRemaining ?? 0)}</span>
                  <span
                    className={'text-[9px] opacity-50'}>{dayjs.unix(player.timeJoined ?? 0).format('YY-MM-DD')}</span>
                </div>
              </div>
            ))
          }
        </div>
        <div className={'flex space-x-2 md:flex-row flex-col p-2'}>
          <Piegraph
            countById={cntData.map(item => ({value: item.cnt, name: item.name}))}
            countData={cntData}
            style={{height: 400, width: 800}}
          />
        </div>
        <PlaytimeGraph
          playtime={playtimeData}
          players={players}
          style={{height: 400, width: 1000}}
        />
        <WordCloud words={dicts} height={800} width={800}
                   className={'flex items-center'}/>

        <div className={'grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-2 lg:gap-2 '}>
          {
            recentLibs
              .map(app => <Game key={app.appid} game={app} players={players}/>)
          }
        </div>
      </div>
      <img src={bg} crossOrigin="anonymous" className={'inset-0 absolute -z-10 object-cover h-full'}
           loading={'eager'}/>

    </div>
  )
}