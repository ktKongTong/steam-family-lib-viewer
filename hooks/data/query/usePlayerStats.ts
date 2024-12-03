
import {useMutation} from "@tanstack/react-query";
import {useCallback, useState} from "react";
import {PlayerCommunityData, PlayerStatsData} from "@/interface/playerStatsData";


async function _fetchPlayerStats(id:string, token:string):Promise<null| PlayerStatsData>{
  const data = await fetch(`/api/steam/player-stats/${id}?access_token=${token}`)
    .then(res=>res.json())
  return data.data
}


export const usePlayerStats = (accessToken: string) => {
  const [playerStats, setPlayerStats] = useState<PlayerStatsData | null>(null)

  const { mutateAsync,error } = useMutation({
    mutationFn: (id: string)=> {
      return _fetchPlayerStats(id, accessToken)
    },
  })
  const fetchPlayerStats = useCallback(async(id: string) => {
    const playerStats = await mutateAsync(id)
    // console.log("set Family")
    setPlayerStats(playerStats)

    return playerStats
  },[ mutateAsync])

  const reset = () => setPlayerStats(null)

  return {
    fetchPlayerStats,
    reset,
    playerStats,
    error
  }

}

async function _fetchPlayerCommunityStats(id:string):Promise<null| PlayerCommunityData>{
  const data = await fetch(`/api/steam/player-community-stats/${id}`)
    .then(res=>res.json())
  return data
}

export const usePlayerCommunityStats = () => {
  const [playerCommunityStats, setPlayerCommunityStats] = useState<PlayerCommunityData | null>(null)

  const { mutateAsync,error } = useMutation({
    mutationFn: (id: string)=> {
      return _fetchPlayerCommunityStats(id)
    },
  })
  const fetchPlayerCommunityStats = useCallback(async(id: string) => {
    const playerCommunityStats = await mutateAsync(id)
    // console.log("set Family")
    setPlayerCommunityStats(playerCommunityStats)

    return playerCommunityStats
  },[ mutateAsync])

  const reset = () => setPlayerCommunityStats(null)

  return {
    fetchPlayerCommunityStats,
    reset,
    playerCommunityStats,
    error
  }

}