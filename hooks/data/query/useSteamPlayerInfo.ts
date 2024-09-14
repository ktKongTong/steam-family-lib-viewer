import {useMutation} from "@tanstack/react-query";
import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {
  CPlayer_GetPlayerLinkDetails_Response,
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails
} from "@/proto/gen/web-ui/service_player_pb";
import {useCallback, useState} from "react";

async function fetchFamilyMembers(token:string,ids:string[]){
  const data = await fetch(`/api/steam/player/${ids.join(',')}?access_token=${token}`)
    .then(res=>res.json() as any as ProxiedAPIResponse<CPlayer_GetPlayerLinkDetails_Response>)

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
    setFamilyMembers(res?.data?.accounts!)
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