'use client'
import {Piegraph} from "@/app/(chart)/piegraph";
import {PlaytimeGraph} from "@/app/(chart)/playtimeGraph";
import WordCloud from "@/app/(chart)/wordcloud";
import React from "react";
import {Player} from "@/app/page";
import {SteamAppPlaytime} from "@/interface/steamPlaytime";
import Game from "@/app/game";
import {useComputedData} from "@/hooks/use-computed-data";
import PlayerItem from "@/app/player";
import EchartWordCloud from "@/app/(chart)/echart-worldcloud";

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
  const filteredPlayer = players
  const {
    cntData,
    dicts,
    playtimeData,
    recentLibs
  } = useComputedData(libs,filteredPlayer,players, libsPlaytime)

  return (
    <div className={"relative z-10 overflow-hidden rounded-lg"} id={'data-graph'}>
      <div className={'bg-blend-darken dark bg-black/[.6] z-10 rounded-lg flex flex-col items-center justify-center mx-auto space-y-2 p-1 md:p-4'}>
        <div className={"text-xl text-white  mx-auto"}> {family.data.familyGroup.name}</div>
        <div className={"grid grid-cols-2 sm:grid-cols-3 justify-evenly items-center w-full gap-1"}>
          {
            players.map(player => (<PlayerItem key={player.steamid} player={player}/>))
          }
        </div>
        <Piegraph
          countById={cntData.map(item => ({value: item.cnt, name: item.name}))}
          countData={cntData}
          style={{height: 400, width: 800}}
        />
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