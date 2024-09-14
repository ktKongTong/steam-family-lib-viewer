
import {cooldownDurationTostring} from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";
import {Player} from "@/interface/steamPlaytime";

export default function PlayerItem({
  player
}:{
  player:Player
}) {
  return (
    <div className={`flex dark items-center mx-4 hover:bg-zinc-700/30 cursor-pointer rounded-lg px-1 py-0.5 sm:px-4 sm:py-2`}>
      <img
        src={`https://avatars.akamai.steamstatic.com/${player.avatar_hash}_full.jpg`}
        loading={'lazy'}
        className={`w-8 h-8 rounded-full`}/>
      <div className={'text-xs text-zinc-100/70 pl-2 flex flex-col'}>
        <span>{player.personaName}</span>
        <span
          className={'text-xs opacity-50'}>{cooldownDurationTostring(player.cooldownSecondsRemaining ?? 0)}</span>
        <span
          className={'text-[9px] opacity-50'}>{dayjs.unix(player.timeJoined ?? 0).format('YY-MM-DD')}</span>
      </div>
    </div>
  )

}