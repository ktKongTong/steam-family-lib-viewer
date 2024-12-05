import {LibItem} from "@/hooks/data/query/useSteamPulicLib";
import React, {useMemo} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {GameOwner} from "@/hooks/data/usePlayerMap";
import Link from "next/link";

export interface GameProps {
  game:LibItem,
  owners: GameOwner[]
}

export function GameItem({game, owners}: GameProps) {
  // ?t=${Date.now()}
  const img = useMemo(() => `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/${game.capsule_filename}`, [game.appid, game.capsule_filename])
  return (
    <div className={' max-w-40 relative aspect-[6/9] h-auto'}>

      <img className={"absolute w-full h-full bg-blend-darken bg-black/70 rounded-lg z-0 inset-0"}
           loading={'lazy'} src={img}></img>
      <div
        className={' absolute top-0 left-0 p-1 flex text-white text-xs rounded-tl-md rounded-br-md space-x-2 bg-blend-darken bg-black/[.6]'}>
        {game.appid}
      </div>
      <div className={'text-xs absolute bottom-0 left-0 p-1 flex text-white space-x-2  rounded-tr-md rounded-bl-md bg-blend-darken bg-black/[.6]'}>
        <Link href={`https://store.steampowered.com/app/${game.appid}`} target={'_blank'} className={'animate-underline  break-all line-clamp-1 after:bg-zinc-50/70'}>{game.name}</Link>
      </div>
      <div className={' absolute bottom-0 right-0 p-1 flex text-white space-x-2'}>
        <div className={'mt-auto ml-auto flex flex-col group '}>
          {
            owners.map((it, index) =>
                <Link key={index} href={`https://steamcommunity.com/profiles/${it.steamid}/`} target={'_blank'}>
                  <Avatar
                    className={cn('h-6 w-6 border-[2px] border-zinc-700', '-mt-[10px] group-hover:mb-[10px]  transition-all ease-in-out')}>
                    <AvatarImage src={it.avatarfull} alt={`@${it.personaname}`}/>
                    <AvatarFallback>{it.personaname}</AvatarFallback>
                  </Avatar>
                </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}