import {PlayerInfo} from "@/hooks/data/usePlayerStore";
import _ from "lodash";
import {useToast} from "@/components/ui/use-toast";
import {LibItem} from "@/hooks/data/query/api";

export type GameOwner = ReturnType<typeof usePlayerInfoMapToGame>['allGames'][number]['owners'][number]

export interface MappedGame {
  game: LibItem,
  owners: GameOwner[],
}

export const usePlayerInfoMapToGame = (players: PlayerInfo[]) => {
  const games = players.flatMap(player=>player.ownedGames.map(it=>({game: it, owner: {...player.summary, playtime_forever: it.playtimeForever }})))
  const groupedGames= _.groupBy(games, 'game.appid')
  const allGames = _.map(groupedGames, (it) => {
    const owners = it.map(it=>it.owner)
    const game  = it[0].game
    return {
      game,
      owners
    }
  })
  return {
    allGames
  }
}


// get diffGame between groupA and groupB
// 1. copy
// 2. new
// 3. only
export const useDiffGames = (playerGroupA: PlayerInfo[], playerGroupB: PlayerInfo[]) => {
  // const [playerGroupA, setPlayerGroupA] = useState<PlayerInfo[]>([])
  // const [playerGroupB, setPlayerGroupB] = useState<PlayerInfo[]>([])
  const { toast } = useToast()

  const { allGames: groupAGames} = usePlayerInfoMapToGame(playerGroupA)

  const { allGames: groupBGames} = usePlayerInfoMapToGame(playerGroupB)

  const groupAAppId = groupAGames.map(it=> it.game.appid)
  const groupBAppId = groupBGames.map(it=> it.game.appid)

  const groupAOnly =  groupAGames.filter(it=> !groupBAppId.includes(it.game.appid))

  const groupBOnly = groupBGames.filter(it=> !groupAAppId.includes(it.game.appid))

  const groupAOfOverlap = groupAGames.filter(it=> groupBAppId.includes(it.game.appid))

  const groupBOfOverlap = groupBGames.filter(it=> groupAAppId.includes(it.game.appid))

  const migratePlayerBetweenAAndB = (playerId: string, direction: boolean)=> {

  }

  const addPlayerToGroupA = (player: PlayerInfo)=> {
    if(playerGroupA.filter(it=> it.steamID === player.steamID).length) {
      toast({title: '无需重复添加'})
      return
    }
    // setPlayerGroupA([...playerGroupA, player])
  }
  const addPlayerToGroupB = (player: PlayerInfo)=> {
    if(playerGroupB.filter(it=> it.steamID === player.steamID).length) {
      toast({title: '无需重复添加'})
      return
    }
    // setPlayerGroupB([...playerGroupB, player])
  }

  return {
    playerGroupA,
    playerGroupB,
    addPlayerToGroupA,
    addPlayerToGroupB,
    migratePlayerBetweenAAndB,
    groupBOfOverlap,
    groupAOfOverlap,
    groupAOnly,
    groupBOnly,
  }
}