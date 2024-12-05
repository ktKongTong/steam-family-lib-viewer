'use client'
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {useMeasure} from "react-use";
import {GridCellProps} from "react-virtualized/dist/es/Grid";
import {GameItem, GameProps} from "@/app/compare/gameItem";
import {Grid} from "react-virtualized";
import React from "react";


interface GameGridProps {
  games: GameProps[],
  height: number
}

export function VirtualizedGameGrid(
  {games, height}: GameGridProps
) {
  const isMd = useMediaQuery("only screen and (max-width : 768px)")
  const rowCount = isMd ? 3 : 5
  const [ref, { width, height:headerHeight }] = useMeasure();
  const itemWidth = width / rowCount
  const itemHeight = width/ rowCount * 1.5

  const gridHeight = Math.max(height - 8 - headerHeight, 400)

  function cellRenderer({columnIndex, key, rowIndex, style}:GridCellProps) {
    if(!games[rowIndex * rowCount + columnIndex]) {
      return null
    }
    const game = games[rowIndex * rowCount + columnIndex]
    return (
      <div key={key} style={style} className={'p-2'}>
        <GameItem game={game.game} owners={game.owners} />
      </div>
    );
  }

  return (
    <div className={'h-full grow'}>
      {/*@ts-ignore*/}
      <div className={'w-full'} ref={ref}>
        所有游戏数：{games.length}
      </div>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={rowCount}
        columnWidth={itemWidth}
        rowHeight={itemHeight}
        rowCount={Math.floor(games.length / rowCount)}
        width={width}
        autoContainerWidth
        height={gridHeight}
      />
      {/*<ul className={"grid gap-2 grid-cols-3 md:grid-cols-5  max-h-full overflow-scroll"}>*/}
      {/*  {*/}
      {/*    games*/}
      {/*      .map((game: GameProps) => (*/}
      {/*        <li key={game.game.appid}>*/}
      {/*          <GameItem game={game}/>*/}
      {/*        </li>*/}
      {/*      ))*/}
      {/*  }*/}
      {/*</ul>*/}
    </div>
  )
}