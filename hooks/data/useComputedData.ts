
import {Player, SteamAppPlaytime} from "@/interface/steamPlaytime";
import {useMemo} from "react";
import _ from "lodash";
import {StoreItem} from "@/proto/gen/web-ui/common_pb";
import {convertTag} from "@/lib/tagdict";


export const useComputedData = (
  libs: any[],
  filteredPlayer: any[],
  players: Player[],
  libsPlaytime: SteamAppPlaytime[]
)=> {
  const names = useMemo(()=>players.map(account=>({
    id: account.steamid,
    name: account.personaName
  })),[players])
  const libPlaytimePlayerSummary = _.keyBy(libsPlaytime, 'appid')
  const appsForUse= useMemo(()=>libs
      .filter(item=>
        {
          return filteredPlayer.filter(player=>item.ownerSteamids.includes(player.steamid)).length > 0
        }
      ).sort((a,b)=>b.rtTimeAcquired - a.rtTimeAcquired)
      .map(item=> {
        return {
          playtime: libPlaytimePlayerSummary[item.appid],
          ...item
        }
      })
    ,[filteredPlayer, libPlaytimePlayerSummary, libs])
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

  const allPlayTimeData = libsPlaytime.flatMap(it => it.players)
  const playersPlayData = _.groupBy(allPlayTimeData,'steamid')
  const playtimeData = _.keys(playersPlayData).map(key=> {
    const it = playersPlayData[key]
    const asOwnerLendTime = it.filter(item=> item.isOwner).reduce((acc,cur) => acc + cur.secondsPlayed!,0)
    const asPlayerTime = it.filter(item=> !item.isOwner).reduce((acc,cur) => acc + cur.secondsPlayed!,0)
    return {
      asOwnerLendTime,
      asPlayerTime,
      steamid: key
    }
  })
  const recentLibs = appsForUse
    .sort((a,b)=> {return (b.rtTimeAcquired ?? 0) - (a.rtTimeAcquired ?? 0)})
    .slice(0,12)
  return {
    cntData,
    dicts,
    playtimeData,
    appsForUse,
    recentLibs
  }
}