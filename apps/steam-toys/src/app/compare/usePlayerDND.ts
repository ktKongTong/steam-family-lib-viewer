import {Dispatch, SetStateAction, useState} from "react";
import {PlayerInfo} from "@/hooks/data/usePlayerStore";
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {PlayersMap} from "@/app/compare/page";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {useToast} from "@/components/ui/use-toast";

function findContainer(players: PlayersMap,id: string | number | undefined) {
  if(!id) return undefined
  if (id in players) {
    return id;
  }

  // if ((id as string).endsWith('source')) {
  //   return 'source'
  // }


  let ans = Object.keys(players).find((key) => players[key as keyof PlayersMap].findIndex((it)=>(id as string).startsWith(it.id)) >= 0)
  return ans! as string
}

function getIndexById(players: (PlayerInfo & {id: string})[], id: string| number | undefined) {
  if(!id) {
    return -1
  }
  return players.findIndex(player => (id as string).startsWith(player.steamID))
}

export const usePlayerDND = (players:PlayersMap, setPlayers: Dispatch<SetStateAction<PlayersMap>>) => {
  const {toast} = useToast()
  const [activePlayer, setActivePlayer] = useState<PlayerInfo & { id: string }|null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  return {
    sensors,
    activePlayer,
    setActivePlayer,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
  }
  function handleDragStart(event:DragStartEvent) {
    const { active } = event;
    const { id } = active;
    // 如果active 的 container 是 source，就不激活？
    const res = players['source'].find(player => (id as string).startsWith(player.id))!;
    setActivePlayer(res);
  }


  function handleDragOver(event:DragOverEvent) {

    const { active, over } = event;
    const { id } = active;
    const activeContainer = findContainer(players, id) as keyof PlayersMap
    const overContainer = findContainer(players, over?.id)as keyof PlayersMap
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer ||
      overContainer === 'source'
    ) {
      return;
    }
    // console.log("set items")
    setPlayers((prev: PlayersMap) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = getIndexById(activeItems, id)
      const overIndex = getIndexById(overItems, over?.id)

      let newIndex;

      if (over!.id  in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1
        // &&
        // draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;
        const modifier = isBelowLastItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      if(getIndexById(overItems, id) !== -1) {
        return prev;
      }

      const cur = players[activeContainer][activeIndex]
      if(!cur.openLib) {
        toast({
          title: '该玩家的库存处于私密状态，无法计算'
        })
        return prev;
      }
      if(activeContainer === 'source') {
        const anotherContainer = overContainer == 'targetA' ? 'targetB' : 'targetA'

        const another = prev[anotherContainer].filter(it => !it.id.startsWith(cur.steamID))
        const newState = {
          ...prev,
          [overContainer]: [
            ...prev[overContainer].slice(0, newIndex),
            cur,
            ...prev[overContainer].slice(newIndex, prev[overContainer].length)
          ],
          [anotherContainer]: another
        }
        return newState;
      }
      const newState = {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => !(active.id as string).startsWith(item.steamID))
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          cur,
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      }
      return newState;
    });
  }

  function handleDragEnd(event:DragEndEvent) {
    const { active, over } = event;
    // return;
    const { id } = active;
    const activeContainer = findContainer(players,id) as keyof PlayersMap
    const overContainer = findContainer(players,over?.id) as keyof PlayersMap

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    setPlayers((prev:PlayersMap) =>{
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = getIndexById(activeItems, id)
      const overIndex = getIndexById(overItems, over?.id)
      if (activeIndex !== overIndex) {
        return {
          ...prev,
          [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex)
        }
      }
      return prev
    });

  }
}