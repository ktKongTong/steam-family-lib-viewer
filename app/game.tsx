import {ImageWithFallback} from "@/app/fallbackImg";
import dayjs from "dayjs";
import React, {useCallback, useEffect, useState} from "react";
import {App, Player} from "@/app/page";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {convertTag} from "@/lib/tagdict";
import {useMediaQuery} from "@uidotdev/usehooks";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface GameProps {
  game: App,
  players:Player[]
}

const getAvatar = (hash:string) => `https://avatars.akamai.steamstatic.com/${hash}_full.jpg`
const getSteamAsset = (appid:string,name:string) => `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/${name}?t=1702072288`

const getGameAsset = (game:App, filename:string) => {
  const format = game.detail.assets?.assetUrlFormat
  const prefix = "https://cdn.akamai.steamstatic.com/"
  const url = format?.replace("${FILENAME}", filename)
  // console.log(prefix+url)
  return prefix + url
}
const getGameTrailer = (game:App) => {
  try {
    const format = game.detail.trailers?.highlights?.[0]!.trailerUrlFormat!
    const prefix = "https://cdn.akamai.steamstatic.com/"
    //
    // https://cdn.akamai.steamstatic.com/steam/apps/256689996/microtrailer.webm
    const filename = game.detail.trailers?.highlights?.[0]!.microtrailer[0].filename!
    const url = format.replace("${FILENAME}", filename)
    return prefix + url
  }catch (e) {
    return null
  }

}
const getGameHeader = (game:App) => {
  return getGameAsset(game,game.detail.assets?.header!)
}

const getGameCapsule = (game:App) => {
  return getGameAsset(game,game.detail.assets?.libraryCapsule??'')
}
interface Media {
  src: string
  type:'video'|'img'
}

const useCycle = (range:number)=> {
  const [current, setCurrent] = useState(0)
  const stepOne = useCallback(()=> {
    setCurrent((current+1)%range)
  },[setCurrent,current,range])
  return {
    current,
    stepOne
  }
}

const HoverContent =({game}:GameProps)=> {
  const trailerURL = getGameTrailer(game)
  const m:Media[] = trailerURL ? [{type: 'video', src: trailerURL}]:[]
  const medias = m.concat(game
    .detail
    .screenshots
    ?.allAgesScreenshots.map(screenshot => ({
      src: `https://cdn.akamai.steamstatic.com/${screenshot.filename}`,
      type: 'img'
    }))??[])
  const {current, stepOne} = useCycle(medias.length)
  useEffect(()=>{
    const interval = setInterval(()=>{stepOne()},5000)
    return ()=>{clearInterval(interval)}
  },[current, stepOne])
  return (
    <div className={'dark'}>

      <div className={'relative rounded-t-lg w-64'}>
        <div className={'rounded-t-lg w-64 aspect-[16/9]'}>
          {
            medias?.map((media, idx) => (
              <div key={media.src} className={cn('aspect-[16/9] w-64',current != idx && 'hidden')}>
                {
                  media.type == 'img' &&
                    <img src={media.src}
                         className={cn('rounded-t-lg ease-in-out transition-all')}/>
                }
                {
                  media.type == 'video' &&
                    <video autoPlay loop src={media.src}
                           className={cn('rounded-t-lg ease-in-out transition-all')}/>
                }
              </div>
            ))
          }
        </div>

        <div className={'flex relative min-h-6 items-center'}>
          <img src={getGameHeader(game)} className={'max-w-28 absolute bottom-0 rounded-l-md'}/>
          <div className={'ml-auto text-white mr-2'}>
            {
              game.detail.bestPurchaseOption?.discountPct ? (
                <div className={'flex space-x-2 items-center'}>
                  <div className={'text-green-300 font-bold bg-green-600 p-2 h-full'}>{100 - game.detail.bestPurchaseOption.discountPct}%</div>
                  <div>
                    <div className={'opacity-50 line-through decoration-1 decoration-green-300 text-[9px]'}>{game.detail.bestPurchaseOption?.formattedOriginalPrice}</div>
                    <div
                      className={'text-green-300 font-bold text-[12px]'}>{game.detail.bestPurchaseOption?.formattedFinalPrice}</div>
                  </div>

                </div>

              ) : (
                <div>
                  {game.detail.bestPurchaseOption?.formattedFinalPrice}
                </div>
              )
            }

          </div>
        </div>

      </div>
      <div className={'dark:text-white p-1'}>
        {game.name}
      </div>
      <div className={'flex gap-1 text-sm w-full flex-wrap'}>
        {
          game.detail.tagids.slice(0, 7).map(it => (
            <span key={it}
                  className={'px-1 text-xs rounded-md font-light text-[6px] py-0.5 w-fit text-zinc-300 bg-zinc-700/30'}>
                    {convertTag(it)}
                  </span>
          ))
        }
      </div>

    </div>
  )
}

export default function Game({
 game,
 players
}: GameProps
) {
  const sm = useMediaQuery("only screen and (max-width : 768px)")

  game.playtime
  return (
    <div key={game.appid}
         className={'relative w-24 sm:w-36 md:w-36 aspect-[6/9] rounded-lg text-xs text-zinc-600/60'}>
      <div className={'w-full h-full relative'}>

        {
          sm ? (<Popover>
                <PopoverTrigger>
                    <ImageWithFallback
                        fallbackSrc={game.detail.assets?.libraryCapsule ? getGameAsset(game, game.detail.assets?.libraryCapsule) : `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/portrait.png`}
                        src={getGameCapsule(game)}
                        className={' rounded-lg absolute z-0 inset-0'}
                        loading={'lazy'}
                    />
                </PopoverTrigger>
                <PopoverContent side={'left'}
                                  className={'bg border-none shadow-none p-0 rounded-lg bg-black/[.8] w-64'}>
                    <HoverContent game={game} players={players}/>
                </PopoverContent>
            </Popover>):(
            <HoverCard>
              <HoverCardTrigger>
                <ImageWithFallback
                  fallbackSrc={game.detail.assets?.libraryCapsule? getGameAsset(game, game.detail.assets?.libraryCapsule) : `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/portrait.png`}
                  src={getGameCapsule(game)}
                  className={' rounded-lg absolute z-0 inset-0'}
                  loading={'lazy'}
                />
              </HoverCardTrigger>
              <HoverCardContent side={'left'}
                                className={'bg border-none shadow-none p-0 rounded-lg bg-black/[.8] w-64'}>
                <HoverContent game={game} players={players}/>
              </HoverCardContent>
            </HoverCard>
          )

        }
        <div className={'absolute text-white text-[8px] top-0 left-0 bg-zinc-700/50 px-1 py-0.5 rounded-md text-xs'}>
          <div>{dayjs.unix(game.rtTimeAcquired!).format('YY年MM月DD日')}</div>
        </div>
        <div className={'absolute bottom-0 left-0 p-1 flex text-white space-x-2'}>
          {
            game.playtime &&
            (
              <div>
                {game.playtime.players.map((playtime:any) => {
                  const player = players.find(it=>it.steamid?.toString() == playtime.steamid)
                  return (
                    <div key={playtime.steamid}>
                      {player?.personaName}: {(playtime.secondsPlayed/3600).toFixed(1)} h
                    </div>
                  )
                })}
              </div>
            )
          }
        </div>
        <div className={' absolute bottom-0 right-0 p-1 flex text-white space-x-2'}>
          <div className={'mt-auto ml-auto flex flex-col group '}>
            {
              game.owners.map((it, index) =>
                < div key={index}>

                  <Avatar
                          className={cn('h-6 w-6 border-[2px] border-zinc-700', '-mt-[10px] group-hover:mb-[10px]  transition-all ease-in-out')}>
                    <AvatarImage src={getAvatar(it?.avatar_hash??"")} alt={`@${it?.personaName}`}/>
                    <AvatarFallback>{it?.personaName}</AvatarFallback>
                  </Avatar>
                </div>
              )
            }
          </div>
        </div>
      </div>


    </div>
  )
}