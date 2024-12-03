import {useCallback, useState} from "react";
import {
  CPlayer_GetPlayerLinkDetails_Response,
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails
} from "@/proto/gen/web-ui/service_player_pb";
import {useMutation} from "@tanstack/react-query";
import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {useAPIKey} from "@/hooks/data/useAPIKeyStore";

export interface PlayerSummariesResponse {
  players?: PlayerSummary[]
}
export interface PlayerSummary {
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  lastlogoff?: number
  personastate: number
  primaryclanid?: string
  timecreated?: number
  personastateflags?: number
  loccountrycode?: string
  locstatecode?: string
  loccityid?: number
}

async function fetchSteamPlayerSummaries(apikey:string,ids:string[]){
  const data = await fetch(`/api/steam/player/summaries?steamids=${ids.join(',')}&key=${apikey}`)
    .then(res=>res.json() as any)
  return data.response as PlayerSummariesResponse
}
export const useSteamPlayerSummaries = () => {
  // const [steamPlayers, setFamilyMembers] = useState<CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails[]>([])
  const {mutateAsync, error} =  useMutation({
      mutationFn: ({apikey,ids}: {
        apikey: string,
        ids: string[]
      })=> {
        return fetchSteamPlayerSummaries(apikey, ids)
      },
    }
  )
  const { apiKey } = useAPIKey()


  const [steamPlayers, setSteamPlayers] = useState<PlayerSummary[]>([])
  const fetchPlayerSummaries = useCallback(async(steamIds: string[]) => {
    const res = await mutateAsync({ apikey:apiKey!!, ids: steamIds })
    setSteamPlayers(res.players ?? [])
    // toMap
    return res
  },[apiKey, mutateAsync])

  const reset = () => setSteamPlayers([])
  return {
    fetchPlayerSummaries,
    steamPlayers,
    reset,
    error
  }
}