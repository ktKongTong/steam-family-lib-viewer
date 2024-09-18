
import React, {Dispatch, SetStateAction, useState} from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors, DragOverEvent, DragStartEvent, DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import {PlayerInfo} from "@/hooks/data/usePlayerStore";
import {DraggablePlayerContainer, DroppablePlayerContainer} from "@/app/compare/playerContainer";
import {WrappedPlayer} from "@/app/compare/wrappedPlayer";
import {PlayersMap} from "@/app/compare/page";
import {usePlayerDND} from "@/app/compare/usePlayerDND";




const defaultAnnouncements = {
// @ts-ignore
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  // @ts-ignore
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  // @ts-ignore
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  // @ts-ignore
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  }
};



export function DND({
  players,
  setPlayers
}:{
  players: PlayersMap,
  setPlayers: Dispatch<SetStateAction<PlayersMap>>
}) {



  const {
    activePlayer,
    sensors,
    setActivePlayer,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
  } = usePlayerDND(players, setPlayers)

  return (
    <div className={'grid grid-cols-2 grid-rows-2 gap-2'}>
      <DndContext
        // announcements={defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <DraggablePlayerContainer id="source" players={players.source} className={'col-span-2 border rounded-lg'}/>
        <DroppablePlayerContainer id="targetA" players={players['targetA']}  className={'col-span-1 border rounded-lg'} />
        <DroppablePlayerContainer id="targetB" players={players['targetB']}  className={'col-span-1 border rounded-lg'} />
        <DragOverlay>{activePlayer ? <WrappedPlayer player={activePlayer} className={'w-auto'}/> : null}</DragOverlay>
      </DndContext>
    </div>
  );


}