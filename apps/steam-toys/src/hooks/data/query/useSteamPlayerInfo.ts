import {useMutation} from "@tanstack/react-query";
import {useCallback, useState} from "react";
import {f} from '@/lib/omfetch'
import {
  SteamStdResponseType,
  InferRespType,
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails
} from "@repo/steam-proto";

type R = SteamStdResponseType<'Player', 'GetPlayerLinkDetails'>
type R1 = InferRespType<'Player', 'GetPlayerLinkDetails'>

async function fetchFamilyMembers(token:string,ids:string[]){

  const data = await f.get<SteamStdResponseType<'Player', 'GetPlayerLinkDetails'>>(`/api/steam/player/${ids.join(',')}?access_token=${token}`)
  return data
}

export const useSteamPlayerInfo = (accessToken: string) => {
  const [steamPlayers, setFamilyMembers] = useState<CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails[]>([])
  const {mutateAsync, error} =  useMutation({
      mutationFn: ({
                     token,ids,
                   }: {
        token: string,
        ids: string[]
      })=> {
        return fetchFamilyMembers(token, ids)
      },
    }
  )


  const fetchSteamPlayers = useCallback(async(memberIds: string[]) => {
    const res = await mutateAsync({ token:accessToken, ids: memberIds })

    if(res.data) {
      setFamilyMembers(res.data.accounts)
    }

    return res
  },[accessToken, mutateAsync])

  const reset = () => setFamilyMembers([])
  return {
    fetchSteamPlayers,
    steamPlayers,
    reset,
    error
  }
}