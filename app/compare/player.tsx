import {PlayerInfo} from "@/hooks/data/usePlayerStore";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Ellipsis, Lock} from "lucide-react";
import React from "react";
import {IcomoonFreeLock} from "@/components/LockIcon";


export interface PlayerMenuItem {
  text: string,
  onClick: (player:PlayerInfo) => void
}

export const Player = (
{
  player,
  menus
}:{
  player: PlayerInfo,
  menus: PlayerMenuItem[]
}) => {
  return (
    <div key={player.steamID} className={"hover:bg-zinc-200/70 rounded-lg  p-2"}>
      <div className={"rounded min-w-40 flex gap-2 "}>
        <div className={'relative'}>
          <Avatar>
            <AvatarImage src={player.summary.avatarfull}></AvatarImage>
            <AvatarFallback>{player.summary.personaname}</AvatarFallback>
          </Avatar>
          {
            player.openLib ? null:
              // <div className={'absolute right-0 bottom-0 w-4 h-4 flex items-center justify-center p-1 font-extrabold text-zinc-50 bg-black/[.4] bg-blend-darken rounded-full'}>
              //   L
              // </div>
            <IcomoonFreeLock className={'absolute right-0 bottom-0 w-4 h-4 flex items-center pl-1 justify-center font-extrabold text-zinc-50 bg-black/[.4] bg-blend-darken rounded-full'}/>
          }
        </div>

        <div className={"flex"}>
          <div>
            <div>{player.summary.personaname}</div>
            <div className={" text-zinc-300 text-xs italic"}>{player.summary.steamid}</div>
          </div>
          <div>

          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className={'ml-auto'}>
            <Button variant={'ghost'} size={'icon'}><Ellipsis/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {
              menus.map(menuItem => (
                <DropdownMenuItem key={menuItem.text} onClick={() => menuItem.onClick(player)}>
                  <div>{menuItem.text}</div>
                </DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}