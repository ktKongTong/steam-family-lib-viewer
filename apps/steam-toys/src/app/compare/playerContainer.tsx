import {useDraggable, useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React from "react";
import {PlayerInfo} from "@/hooks/data/usePlayerStore";
import {WrappedPlayer} from "@/app/compare/wrappedPlayer";
import {PlayerMenuItem} from "@/app/compare/player";

// const containerStyle = {
//   background: "#ed8585",
//   padding: 10,
//   margin: 10,
//   flex: 1
// };
interface PlayerContainerProps {
  players: (PlayerInfo & { id: string })[];
  id: string,
  className?: string,
  group: string,
  menus: PlayerMenuItem[]
}

export function DroppablePlayerContainer({id,players,className, group, menus}:PlayerContainerProps) {

  const { setNodeRef } = useDroppable({id});

  return (
    <SortableContext
      id={id}
      items={players}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}  className={className}>
        {players.map((player) => (
          <WrappedPlayer key={player.steamID} player={player} group={group} menus={menus}/>
        ))}
      </div>
    </SortableContext>
  );
}



export function DraggablePlayerContainer(props:PlayerContainerProps) {
  const { id, players,className } = props;

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });

  return (
    <SortableContext
      id={id}
      items={players}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}  className={className}>
        {players.map((player) => (
          <WrappedPlayer key={player.steamID} player={player} group={props.group} menus={props.menus}/>
        ))}
      </div>
    </SortableContext>
  );
}