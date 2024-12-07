
import {useMutation} from "@tanstack/react-query";
import { PlayerCommunityData } from "@/interface/playerstats";
import {f as fetch} from '@/lib/omfetch'
import {PlayerStats} from "@/interface/playerstats";

const f = fetch

export const useNewPlayerStats = (accessToken?: string) => {
  const { mutateAsync:fetchPlayerStats,error, data: playerStats,reset } = useMutation({
    mutationFn: (id: string)=> f.get<PlayerStats>(`/api/steam/player-stats/${id}?access_token=${accessToken}`)
  })
  return {
    fetchPlayerStats,
    reset,
    playerStats,
    error
  }
}


export const usePlayerCommunityStats = () => {
  const { mutateAsync:fetchPlayerCommunityStats,error, data: playerCommunityStats,reset } = useMutation({
    mutationFn: (id: string)=> f.get<PlayerCommunityData>(`/api/steam/player-community-stats/${id}`)
  })
  return {
    fetchPlayerCommunityStats,
    reset,
    playerCommunityStats,
    error
  }
}