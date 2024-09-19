'use client'
import React, {forwardRef, useCallback, useRef, useState} from "react";
import {Piegraph} from "@/app/(chart)/piegraph";
import {Button} from "@/components/ui/button";
import LockBodyScroll from "@/components/lockBodyScroll";
import {Loader2} from "lucide-react";
import {Overlay} from "@/components/overlay";
import dayjs from "dayjs";
import GamesGrid from "./games-grid";
import duration from 'dayjs/plugin/duration'
import {Player, SteamAppPlaytime} from "@/interface/steamPlaytime";
import {PlaytimeGraph} from "@/app/(chart)/playtimeGraph";

dayjs.extend(duration)

import { toJpeg } from 'html-to-image';

import {useComputedData} from "@/hooks/data/useComputedData";

import {cooldownDurationTostring} from "@/lib/utils";

import EchartWordCloud from "@/app/(chart)/echart-worldcloud";
import {useRandomBackground} from "@/hooks/useRandomBackground";
import {CFamilyGroups_GetFamilyGroupForUser_Response} from "@/proto/gen/web-ui/service_familygroups_pb";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export default function DataGraph(
{
  libs,
  players,
  libsPlaytime,
  family,
  allDataLoaded
}:{
  libs: any[],
  players: Player[],
  libsPlaytime: SteamAppPlaytime[],
  family: CFamilyGroups_GetFamilyGroupForUser_Response,
  allDataLoaded: boolean,
}
) {


  const [imgURL, setImgURL] = useState('')
  const [overlayOpen, setOverlayOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeOverlay = useCallback(()=> {
    setOverlayOpen(false)
    setImgURL('')
  },[])
  const { background, switchOne } = useRandomBackground()
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

      <div className={'flex flex-col items-center space-y-2 px-2 md:px-2'}>
        <div className={'flex gap-2 items-end w-full'}>
          <Button onClick={share} className={'ml-auto mr-2 flex'} variant={'ghost'}>分享</Button>
          <Button onClick={switchOne} className={'mr-2'} variant={'ghost'}>切换背景</Button>
        </div>
        <Graph ref={ref} players={players} libs={libs} libsPlaytime={libsPlaytime} family={family} allDataLoaded={allDataLoaded} bg={background}/>
      </div>
    </>
  )

  async function share () {
    if(!ref.current) {
      return
    }
    setOverlayOpen(true)

    // const canvas =await html2canvas(document.querySelector("#data-graph")!)
    // const imgURL = canvas.toDataURL()
    // const ele = document.getElementById("data-graph")!
    await toJpeg(ref.current)
    await toJpeg(ref.current)
    await toJpeg(ref.current)
    const url = await toJpeg(ref.current)
    setImgURL(url??"")
  }
}

interface GraphProps {
  libs: any[],
  players: Player[],
  libsPlaytime: SteamAppPlaytime[],
  family: CFamilyGroups_GetFamilyGroupForUser_Response,
  bg: string,
  allDataLoaded: boolean,
}
const  Graph = forwardRef<HTMLDivElement, GraphProps>(({
 libs,
 players,
 libsPlaytime,
 family,
 bg,
 allDataLoaded
}:GraphProps, ref) => {
  const [filteredPlayer, setFilteredPlayer] = useState<Player[]>(players)
  const {
    cntData,
    dicts,
    playtimeData,
    appsForUse
  } = useComputedData(libs,filteredPlayer,players, libsPlaytime)

  const filterUser = (user:any) => {
    if(filteredPlayer.includes(user)) {
      setFilteredPlayer(filteredPlayer.filter(it=>it!=user))
    }else {
      setFilteredPlayer([...filteredPlayer, user])
    }
  }

  const checkActive = useCallback((user:Player)=> {
    return filteredPlayer.map(it=>it.steamid).includes(user.steamid)
  },[filteredPlayer])
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  return <div>

    <div className={"relative z-10 overflow-hidden rounded-lg"} id={'data-graph'} ref={ref}>
      <div
        className={'bg-blend-darken dark bg-black/[.6] z-10 rounded-lg flex flex-col items-center justify-center mx-auto space-y-2 p-1 md:p-4'}>
        <div className={"text-xl text-white  mx-auto"}> {family!.familyGroup!.name}</div>
        <div className={"grid grid-cols-2 sm:grid-cols-3 justify-evenly items-center w-full gap-1"}>
          {
            players.map(player => (
              <div
                key={player.steamid}
                className={`flex dark items-center mx-4 hover:bg-zinc-700/30 cursor-pointer rounded-lg px-1 py-0.5 sm:px-4 sm:py-2 ${checkActive(player) ? '' : 'grayscale'}`}
                onClick={() => {
                  filterUser(player)
                }}
              >
                <img
                  src={`https://avatars.akamai.steamstatic.com/${player.avatar_hash}_full.jpg`}
                  loading={'lazy'}
                  className={`w-8 h-8 rounded-full ${checkActive(player) ? '' : 'grayscale'}`}/>
                <div className={'text-xs text-zinc-100/70 pl-2 flex flex-col'}>
                  <span>{player.personaName}</span>
                  <span
                    className={'text-xs opacity-50'}>{cooldownDurationTostring(player.cooldownSecondsRemaining ?? 0)}</span>
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
        <div className={'h-[800px]'}>
          {allDataLoaded && <EchartWordCloud
              words={dicts} height={800} width={isSmallDevice ? window.innerWidth - 40 : 800}
              className={'flex items-center'}
          />}
        </div>
      </div>
      <img src={bg} crossOrigin="anonymous" className={'inset-0 absolute -z-10 object-cover h-full'}
           loading={'eager'}/>
    </div>
    <GamesGrid apps={appsForUse} players={players}/>
  </div>
})

Graph.displayName = 'Graph'
