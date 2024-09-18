import {PlayerInfo} from "@/hooks/data/usePlayerStore";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Player, PlayerMenuItem} from "@/app/compare/player";
import React from "react";
import {Button} from "@/components/ui/button";
import { Grip } from "lucide-react";

export function WrappedPlayer({player, className, group,menus}:{player:PlayerInfo, className?: string, group: string, menus:PlayerMenuItem[]}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id: player.steamID + `_${group}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style}  className={className}>
      <div className={'flex items-center group'}>
        <Button size={'icon'} variant={'ghost'} ref={setActivatorNodeRef} {...listeners} className={'w-6 h-6 text-zinc-400/70 group-hover:visible invisible'}><Grip /></Button>
        <div className={'w-full grow'}>
          <Player player={player} menus={menus} />
        </div>
      </div>

    </div>
  );
}


