import {useMutation} from "@tanstack/react-query";
import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {CPlayer_GetPlayerLinkDetails_Response} from "@/proto/gen/web-ui/service_player_pb";

async function fetchFamilyMembers(token:string,ids:string[]){
  const data = await fetch(`/api/steam/player/${ids.join(',')}?access_token=${token}`)
    .then(res=>res.json() as any as ProxiedAPIResponse<CPlayer_GetPlayerLinkDetails_Response>)
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}

export const useSteamPlayerInfo = () => {

  return useMutation({
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

}