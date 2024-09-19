'use client'

import {useToast} from "@/components/ui/use-toast";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

import {PlayerInfo, usePlayer} from "@/hooks/data/usePlayerStore";
import {useDiffGames, usePlayerInfoMapToGame} from "@/hooks/data/usePlayerMap";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {closestCorners, DndContext, DragOverlay} from "@dnd-kit/core";
import {DraggablePlayerContainer, DroppablePlayerContainer} from "@/app/compare/playerContainer";
import {WrappedPlayer} from "@/app/compare/wrappedPlayer";
import {usePlayerDND} from "@/app/compare/usePlayerDND";
import {useMeasure} from "react-use";
import GamesGrid from "@/app/compare/pagedGameGrid";
import {useAPIKey} from "@/hooks/data/useAPIKeyStore";

;


export interface PlayersMap {
  targetA:  (PlayerInfo & { id: string })[],
  targetB:  (PlayerInfo & { id: string })[],
  source:  (PlayerInfo & { id: string })[],
}
export default function Home() {
  // const {apiKey, setAPIKey, clearAPIKey} = useAPIKey()
  const [steamID, setSteamID] = useState<string>("")

  const {players, addPlayer, removePlayerById, refreshPlayerById} = usePlayer()

  const onInput = (e: any) => {
    setSteamID(e.target.value)
  }

  const [playersMap, setPlayers] = useState<PlayersMap>({
    targetA: [],
    targetB: [],
    source: players.map(it=>({...it, id: it.steamID})),
  })

  useEffect(()=>{
    setPlayers((prev)=> {
      return {
        ...prev,
        source: players.map(it=>({...it, id: it.steamID})),
      }
    })
  }, [players])
  const {allGames} = usePlayerInfoMapToGame([...playersMap.targetB, ...playersMap.targetA])
  const {
    groupAOnly,
    groupBOnly,
    groupAOfOverlap,
    groupBOfOverlap
  } = useDiffGames(playersMap.targetA, playersMap.targetB);

  const groups = [
    {
      name: `all`,
      games: allGames,
    },
    {
      name: `groupAOnly`,
      games: groupAOnly,
    },
    {
      name: `groupBOnly`,
      games: groupBOnly,
    },
    {
      name: `overlapA`,
      games: groupAOfOverlap,
    },
    {
      name: `overlapB`,
      games: groupBOfOverlap,
    },
  ]

  const {toast} = useToast()
  const {
    activePlayer,
    sensors,
    handleDragOver,
    handleDragStart,
    handleDragEnd,
  } = usePlayerDND(playersMap, setPlayers)

  const groupAMenus = [
    {
    text: 'moveToB',
    onClick: (player:any) => {
      setPlayers(prevState => ({
        targetA: prevState.targetA.filter(it=>it.steamID !== player.steamID),
        targetB: [...prevState.targetB.filter(it=>it.steamID !== player.steamID), player],
        source: prevState.source,
      }))
    },
  },
  {
    text: '移除',
    onClick: (player:any) => setPlayers(prevState => ({
      ...prevState,
      targetA: prevState.targetA.filter(it=>it.steamID !== player.steamID),
    })),
  }]

  const sourceGroupMenus = [
    {
      text: '刷新',
      onClick: (player:PlayerInfo) => refreshPlayerById(player.steamID)
    },
    {
    text: '添加到组A',
    onClick: (player:any) => {
      if(!player.openLib) {
        toast({
          title: '该用户的库存处于私密状态，无法查看'
        })
        return;
      }
      if(playersMap.targetA.find(it=>it.steamID === player.steamID)) {
        return
      }
      setPlayers(prevState => ({
        ...prevState,
        targetB: prevState.targetB.filter(it=>it.steamID !== player.steamID),
        targetA: [...prevState.targetA.filter(it=>it.steamID !== player.steamID), player]
      }))
    },
  },{
    text: '添加到组B',
    onClick: (player:any) => {
      if(!player.openLib) {
        toast({
          title: '该用户的库存处于私密状态，无法查看'
        })
        return;
      }
      if(playersMap.targetB.find(it=>it.steamID === player.steamID)) {
        return
      }
      setPlayers(prevState => ({
        ...prevState,
        targetB: [...prevState.targetB.filter(it=>it.steamID !== player.steamID), player],
        targetA: prevState.targetA.filter(it=>it.steamID !== player.steamID)
      }))
    },
  }, {
    text: '移除',
    onClick: (player:any) => {
      setPlayers(prevState => ({
        source: prevState.source.filter(it=>it.steamID !== player.steamID),
        targetB: prevState.targetB.filter(it=>it.steamID !== player.steamID),
        targetA: prevState.targetA.filter(it=>it.steamID !== player.steamID),
      }))
      removePlayerById(player.steamID)
    },
  }]

  const groupBMenus = [
    {
    text: 'moveToA',
    onClick: (player:any) => setPlayers(prevState => ({
      targetB: prevState.targetB.filter(it=>it.steamID !== player.steamID),
      targetA: [...prevState.targetA, player],
      source: prevState.source,
    })),
  },  {
    text: '移除',
    onClick: (player:any) => setPlayers(prevState => ({
      ...prevState,
      targetB: prevState.targetB.filter(it=>it.steamID !== player.steamID),
    })),
  }]

  const [tabRef, {  height:tabHeight }] = useMeasure();
  const [tabListRef, {  height:tabListHeight }] = useMeasure();
  return (
    <section className={"flex flex-col items-center w-full min-w-full h-full grow md:min-w-96 px-4 md:px-20"}>

      <div className="flex w-full items-center space-x-2  justify-between ">
        <Input type="text" placeholder="steamID" onInput={onInput}/>
        <Button type="submit" onClick={()=>addPlayer(steamID)}>添加</Button>
      </div>
      <div className={'w-full m-2'}>

        <div className={''}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <DraggablePlayerContainer id="source"
                                      players={playersMap.source}
                                      menus={sourceGroupMenus}
                                      className={'col-span-2 border rounded-lg max-h-60 overflow-y-auto'} group={'source'}/>
            <div className={'flex flex-col md:flex-row w-full gap-2'}>
              <div className={'grow w-full h-full'}>
                <div>groupA</div>
                <DroppablePlayerContainer id="targetA" players={playersMap['targetA']} group={'targetA'}
                                          menus={groupAMenus}
                                          className={'border rounded-lg h-40 overflow-y-auto'}/>
              </div>
              <div className={'grow h-full w-full'}>
                <div>groupB</div>
                <DroppablePlayerContainer id="targetB" players={playersMap['targetB']} group={'targetB'}
                                          menus={groupBMenus}
                                          className={'border rounded-lg h-40  overflow-y-auto'}/>
              </div>
            </div>


            <DragOverlay>{activePlayer ?
              <WrappedPlayer group={'none'} player={activePlayer} className={'w-60 blur '} menus={[]}/> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
      {/*@ts-ignore*/}
      <Tabs defaultValue="all" className="w-full h-full grow flex flex-col" ref={tabRef}>
        {/*@ts-ignore*/}
        <TabsList className='flex items-center justify-start flex-wrap h-auto space-y-1' ref={tabListRef}>
          {
            groups.map(it => (
              <TabsTrigger key={it.name} value={it.name}>{it.name}</TabsTrigger>
            ))
          }
        </TabsList>
        {
          groups.map(it => (
            // @ts-ignore
            <TabsContent value={it.name} key={it.name} className={'grow h-full'} >
              <GamesGrid games={it.games}/>
            </TabsContent>
          ))
        }
      </Tabs>
    </section>
  );
}







