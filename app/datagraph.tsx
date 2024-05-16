import ReactECharts from "echarts-for-react";
import WordCloud from "@/app/wordcloud";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {StoreItem} from "@/proto/gen/web-ui/common_pb";
import _ from "lodash";
import {convertTag} from "@/lib/tagdict";
import {ImageWithFallback} from "@/app/fallbackImg";
import {Piegraph} from "@/app/piegraph";
import html2canvas from "html2canvas";
import {Button} from "@/components/ui/button";
import LockBodyScroll from "@/app/lockBodyScroll";

import { useMediaQuery } from "@uidotdev/usehooks";
import {Loader, Loader2} from "lucide-react";
import {Overlay} from "@/app/overlay";
import dayjs from "dayjs";
import Game from "@/app/game";
import GamesGrid from "@/app/games-grid";
import {Player} from "@/app/page";
import duration from 'dayjs/plugin/duration'
import {ExtendedSteamPlaytimeItem, SteamAppPlaytime} from "@/interface/steamPlaytime";
import {PlaytimeGraph} from "@/app/playtimeGraph";
dayjs.extend(duration)

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
  console.log("allPlayTime")
  console.log(allPlayTimeData)
  const playersPlayData = _.groupBy(allPlayTimeData,'steamid')
  const playtimeData = _.keys(playersPlayData).map(key=> {
    const it = playersPlayData[key]
    const asOwnerLendTime = it.filter(item=> item.isOwner).reduce((acc,cur) => acc + cur.secondsPlayed,0)
    const asPlayerTime = it.filter(item=> !item.isOwner).reduce((acc,cur) => acc + cur.secondsPlayed,0)
    return {
      asOwnerLendTime,
      asPlayerTime,
      steamid: key
    }
  })
  return {
    cntData,
    dicts,
    playtimeData,
    appsForUse,
  }
}
// const daySec =

const durationTostring= (duration:number)=> {
  if(duration == 0) return "暂无冷静期"
  if(duration < (24 * 3600)) {
    return "冷静期剩余" + (duration/3600).toFixed(0) + "小时"
  }
  return "冷静期剩余"+ (duration / (24 * 3600)).toFixed(0) + "天"
}
import { toPng } from 'html-to-image';
export default function DataGraph(
{
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
}
) {
  const [filteredPlayer, setFilteredPlayer] = useState<any[]>(players)
  const {
    cntData,
    dicts,
    playtimeData,
    appsForUse
  } = useComputed(libs,filteredPlayer,players, libsPlaytime)

  const setFilterUser = useCallback((user:any) => {
    if(filteredPlayer.includes(user)) {
      setFilteredPlayer(filteredPlayer.filter(it=>it!=user))
    }else {
      setFilteredPlayer([...filteredPlayer, user])
    }
  },[filteredPlayer])

  const checkActive = useCallback((user:any)=> {
    return filteredPlayer.includes(user)
  },[filteredPlayer])
  const [imgURL, setImgURL] = useState('')
  const [overlayOpen, setOverlayOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const share = useCallback(async ()=> {
    if(!ref.current) {
      return
    }
    setOverlayOpen(true)

    // const canvas =await html2canvas(document.querySelector("#data-graph")!)
    // const imgURL = canvas.toDataURL()
    // const ele = document.getElementById("data-graph")!
    const url = await toPng(ref.current, { cacheBust: true, }).catch((e)=> {
      console.log("error", e)
    })


    setImgURL(url??"")
  },[setImgURL,ref])
  const closeOverlay = useCallback(()=> {
    setOverlayOpen(false)
    setImgURL('')
  },[])

  const recentlyCnt= libs.filter(lib=> dayjs.unix(lib.rtTimeAcquired).isAfter(dayjs().add(-1,'month'))).length

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <>
      {overlayOpen &&
        <div>
          <LockBodyScroll/>
          <Overlay onClick={closeOverlay}/>
            <div className={'w-full h-full pointer-events-none top-0 left-0 right-0 px-1 py-16 sm:px-10 sm:pt-24 fixed overflow-y-scroll z-50 block'}>
                <div className={'pointer-events-auto  my-0 mx-auto relative'}>
                  {
                    !imgURL && <Loader2 className={'h-16 w-16 animate-spin mx-auto top-1/2 mt-36 text-white'}/>
                  }
                  {
                    imgURL &&(
                      <>
                        <div className={'text-center text-zinc-300 text-sm mx-auto'}>手机长按保存</div>
                        <img src={imgURL} className={'w-fit max-w-96 mb-4 mx-auto'}/>
                      </>
                    )
                  }
                </div>
            </div>
        </div>
      }

      <div className={'flex flex-col items-center space-y-2 px-2 md:px-20'}>

        {/*<div className={'grid data grid-cols-4 gap-2'}>*/}
        {/*  <div*/}
        {/*    className={'data flex flex-col items-center border-zinc-700 rounded-lg shadow-md p-2 bg-zinc-100/30 backdrop-blur min-w-32'}>*/}
        {/*    <span className={'mr-auto text-lg font-bold'}>作品数</span>*/}
        {/*    <span className={'text-xl font-extrabold ml-auto'}>{appsForUse.length}</span>*/}
        {/*  </div>*/}
        {/*  <div*/}
        {/*    className={'data flex flex-col items-center border-zinc-700 rounded-lg shadow-md p-2 bg-zinc-100/30 backdrop-blur min-w-32'}>*/}
        {/*    <span className={' mr-auto text-lg font-bold'}>最近新增</span>*/}
        {/*    <span className={'text-xl font-extrabold ml-auto'}>+{recentlyCnt}</span>*/}
        {/*  </div>*/}
        {/*</div>*/}


        <Button onClick={share} className={'ml-auto mr-2'} variant={'ghost'}>share</Button>

        <div className={"relative z-10 overflow-hidden rounded-lg"} id={'data-graph'} ref={ref}>
          <div
            className={'bg-blend-darken dark bg-black/[.6] z-10 rounded-lg flex flex-col items-center justify-center mx-auto space-y-2 p-1 md:p-4'}>
            <div className={"text-xl text-white  mx-auto"}> {family.data.familyGroup.name}</div>
              <div className={"grid grid-cols-2 sm:grid-cols-3 justify-evenly items-center w-full gap-1"}>
              {
                players.map(player => (
                  <div
                    key={player.steamid}
                    className={`flex dark items-center mx-4 hover:bg-zinc-700/30 cursor-pointer rounded-lg px-1 py-0.5 sm:px-4 sm:py-2 ${checkActive(player) ? '' : 'grayscale'}`}
                    onClick={() => {
                      setFilterUser(player)
                    }}
                  >
                    <img
                      src={`https://avatars.akamai.steamstatic.com/${player.avatar_hash}_full.jpg`}
                      loading={'lazy'}
                      className={`w-8 h-8 rounded-full ${checkActive(player) ? '' : 'grayscale'}`}/>
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
                  style={{height: 400, width: isSmallDevice ? window.innerWidth - 40 : 800}}
                />
              </div>
              <PlaytimeGraph
                playtime={playtimeData}
                players={players}
                style={{height: 400, width: isSmallDevice ? window.innerWidth - 40 : 1000}}
              />
              <WordCloud words={dicts} height={800} width={isSmallDevice ? window.innerWidth - 40 : 800}
                         className={'flex items-center'}/>
          </div>
          <img src={bg} crossOrigin="anonymous" className={'inset-0 absolute -z-10 object-cover h-full'}
               loading={'eager'}/>
        </div>
        <GamesGrid apps={appsForUse} players={players}/>
      </div>
    </>
  )
}