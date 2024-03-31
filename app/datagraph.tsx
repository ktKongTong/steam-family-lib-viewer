import ReactECharts from "echarts-for-react";
import WordCloud from "@/app/wordcloud";
import React, {useCallback, useMemo, useState} from "react";
import {StoreItem} from "@/proto/gen/web-ui/common_pb";
import _ from "lodash";
import {convertTag} from "@/lib/tagdict";
import {ImageWithFallback} from "@/app/fallbackImg";
import {Piegraph} from "@/app/piegraph";
import html2canvas from "html2canvas";
import {Button} from "@/components/ui/button";
import LockBodyScroll from "@/app/lockBodyScroll";


const useComputed = (
  libs: any[],
  filteredPlayer: any[],
  players: any[]
)=> {
  const names = useMemo(()=>players.map(account=>({
    id: account.steamid,
    name: account.personaName
  })),[players])

  const appsForUse= useMemo(()=>libs
    .filter(item=>
      {
        return filteredPlayer.filter(player=>item.ownerSteamids.includes(player.steamid)).length > 0
      }
    ),[filteredPlayer,libs])

  const games = useMemo(()=>appsForUse
    .flatMap((item) => {
      return item.ownerSteamids.map((it:any) => ({
        ...item,
        ownerSteamid: it,
      }))
    }),[appsForUse])

  const gameById = useMemo(()=>_.countBy(games, game=>game.ownerSteamid.toString()),
    [games])


  const cntData = useMemo(()=>filteredPlayer.map(gamer => ({
    gamer,
    cnt: gameById[gamer.steamid?.toString()!],
    name: names.find(it=>it.id?.toString() == gamer.steamid?.toString()!)?.name
  }))
    .sort((a,b)=>a.cnt - b.cnt),
    [filteredPlayer, gameById, names])


  const tags = useMemo(()=>appsForUse
    .map(app=> app.detail)
    .flatMap((item:StoreItem)=>item.tagids.slice(0,10)),
    [appsForUse])

  const dict = useMemo(()=>_.countBy(tags, it=>it),[tags])
  const dicts = useMemo(()=>Object
    .keys(dict)
    .map(item=>({value:dict[item],text:convertTag(item)}))
    .sort((a,b)=>b.value-a.value)
    ,[dict])
  return {
    cntData,
    dicts,
    appsForUse
  }
}

export default function DataGraph(
{
  libs,
  players
}:{
  libs: any[],
  players: any[]
}
) {
  const [filteredPlayer, setFilteredPlayer] = useState<any[]>(players)

  const {
    cntData,
    dicts,
    appsForUse
  } = useComputed(libs,filteredPlayer,players)

  const option =  useMemo(()=>(
    {
      tooltip : {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: cntData.map(item=>item.name)
      },
      series : [

        {
          name: 'game amount',
          type: 'bar',
          label: {
            show: true,
            position: 'right'
          },
          data: cntData.map(item=>item.cnt)
        },
      ]
    }
  ),[cntData]);

  const setFilterUser = useCallback((user:any) => {
    if(filteredPlayer.includes(user)) {
      setFilteredPlayer(filteredPlayer.filter(it=>it!=user))
    }else {
      setFilteredPlayer([...filteredPlayer, user])
    }
  },[filteredPlayer])

  const checkActive = useCallback((user:any)=> {
    return filteredPlayer.includes(user)
  },[filteredPlayer])
  const [imgURL, setImgURL] = useState('')
  const [overlayOpen, setOverlayOpen] = useState(false)
  const share = useCallback(async ()=> {
    setOverlayOpen(true)
   const canvas =await html2canvas(document.querySelector("#data-graph")!)
   const imgURL = canvas.toDataURL()
    setImgURL(imgURL)
  },[setImgURL])
  const closeOverlay = useCallback(()=> {
    setOverlayOpen(false)
    setImgURL('')
  },[])
  const resetImgUrl = useCallback(()=> {
    setImgURL('')
  },[])
  return (
    <>
      {
        imgURL && <div className={'absolute inset-0 bg-zinc-700/70 z-10'} onClick={resetImgUrl}>
          <LockBodyScroll/>
          <div className={'top-24 relative'}>
            <img src={imgURL} className={'max-w-96 ml-auto mr-auto mt-24'}/>
          </div>
        </div>
      }
      <div className={'flex flex-col items-center space-y-2'}>
        <Button onClick={share} className={'ml-auto mr-2'} variant={'ghost'}>share</Button>
        <div className={"flex flex-col items-center space-y-2 p-4"} id={'data-graph'}>
        <div className={"flex justify-evenly items-center w-full"}>
          {players.map(player => (
            <div
              key={player.steamid}
              className={`flex items-center mx-4 hover:bg-zinc-300/30 cursor-pointer rounded-lg px-4 py-2 ${checkActive(player) ? '' : 'grayscale'}`}
              onClick={() => {
                setFilterUser(player)
              }}
            >
              <img src={`https://avatars.akamai.steamstatic.com/${player.avatar_hash}_full.jpg`} loading={'lazy'}
                   className={`w-8 h-8 rounded-full ${checkActive(player) ? '' : 'grayscale'}`} />
              <div className={'text-xs text-zinc-700/70 pl-2'}>
                <span>{player.personaName}</span>
              </div>
            </div>
          ))
          }
        </div>
        <div className={'flex space-x-2'}>
          <ReactECharts
            option={option}
            style={{height: 400, width: 400}}
          />
          <Piegraph
            countById={cntData.map(item=>({value:item.cnt,name:item.name}))}
            style={{height: 400, width: 400}}
          />
        </div>
        <WordCloud words={dicts} height={800} width={800} className={'flex items-center'}/>
        </div>
        <div className={'grid grid-cols-6 gap-2 '}>
          <div className={'col-span-6 text-xs text-zinc-600'}>
           共 {appsForUse.length} 部作品
          </div>
          {
            appsForUse.map(app=> {
              return (
                <div key={app.appid} className={'relative w-36 aspect-[6/9] rounded-lg text-xs text-zinc-600/60'}>
                  <ImageWithFallback
                    fallbackSrc = {`https://cdn.akamai.steamstatic.com/steam/apps/${app.appid}/portrait.png`}
                    src={`https://cdn.akamai.steamstatic.com/steam/apps/${app.appid}/library_600x900.jpg`}
                    className={'w-full h-full rounded-lg'}
                    loading={'lazy'}
                  />
                  <div>
                    {app.name}
                  </div>
                </div>
              )

            })
          }
        </div>

      </div>
    </>
  )
}