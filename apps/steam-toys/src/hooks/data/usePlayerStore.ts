import { PlayerSummary } from "@/hooks/data/query/interface";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {useAPIKey} from "@/hooks/data/useAPIKeyStore";
import {useToast} from "@/components/ui/use-toast";
import SteamID from "steamid";
import {APIService, LibItem} from "@/hooks/data/query/api";
import {useMutate} from "@/hooks/data/query/use-mutate";

export interface PlayerInfo {
  steamID: string,
  summary: PlayerSummary,
  summaryRefreshedAt: number,
  gamesRefreshedAt: number,
  ownedGames: LibItem[],
  openLib: boolean,
}


interface PlayerStore {
  players: PlayerInfo[]
}

interface PlayerStoreAction {
  addPlayer: (player: PlayerInfo) => void
  removePlayerById: (id: string) => void
}

export const usePlayerStore = create<PlayerStore & PlayerStoreAction>()(
  persist(
    (set, get) => ({
      players: [],
      addPlayer: (player: PlayerInfo) => {
        set((state)=> {
          const players = state.players.filter(it => it.steamID !== player.steamID)
          return {
            players: players.concat([player])
          }
        })
      },
      removePlayerById: (id: string) => {
        set((state)=> {
          const players = state.players.filter(it => it.steamID !== id)
          return {
            players: players
          }
        })
      }
    }),
    {
      name: "playerStore",
      storage: createJSONStorage(() => localStorage),
    },
  )
)


export const usePlayer =()=> {
  const {mutateAsync: fetchPlayerSummaryAsync } = useMutate(APIService.getPlayerSummary)
  const { mutateAsync } = useMutate(APIService.getOwnedGames)
  const {apiKey} = useAPIKey()
  const { toast } = useToast()
  const addPlayerToStore = usePlayerStore(state => state.addPlayer)
  const removePlayerById = usePlayerStore(state => state.removePlayerById)
  const players = usePlayerStore(state => state.players)

  const addPlayer = async (steamIdStr: string)=> {
    let steamId
    try {
      steamId = new SteamID(steamIdStr)
    } catch (e) {
      toast(
        {
          title: "Error",
          description: "不是一个 steamID",
        }
      )
      return
    }
    const id = steamId.getSteamID64()
    const [ playerLibs, playerSummary]= await Promise.all([
      mutateAsync({ apikey:apiKey!!, steamid:id }),
      fetchPlayerSummaryAsync({steamid: id})
    ]).catch(e => {
      toast({
        title: "Error",
        description: "获取用户详情出现错误，详情可查看控制台"
      })
      throw e
    })
    // if()

    addPlayerToStore({
      steamID: id,
      summary: playerSummary!,
      summaryRefreshedAt: Date.now(),
      gamesRefreshedAt: Date.now(),
      ownedGames: (playerLibs.games as any) ?? [],
      openLib: playerLibs.games !== undefined
    })
}

  const refreshPlayerById = async (steamID: string) => {
      await addPlayer(steamID)
  }

  return {
    players,
    addPlayer,
    removePlayerById,
    refreshPlayerById,
  }
}