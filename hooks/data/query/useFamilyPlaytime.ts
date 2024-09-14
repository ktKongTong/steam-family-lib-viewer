import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {
  CFamilyGroups_GetPlaytimeSummary_Response,
  CFamilyGroups_PlaytimeEntry
} from "@/proto/gen/web-ui/service_familygroups_pb";
import _ from "lodash";
import {useMutation} from "@tanstack/react-query";
import {useCallback, useState} from "react";

export interface SharedPlayTimeItem {
  appid: number,
  players: (CFamilyGroups_PlaytimeEntry & {isOwner:boolean})[]
}

async function fetchFamilyPlayTime(token:string,id:string) {
  const data = (await fetch(`/api/steam/family/playtime/${id}?access_token=${token}`)
    .then(res=>res.json())
    ) as ProxiedAPIResponse<CFamilyGroups_GetPlaytimeSummary_Response>
  // console.log(data.data)
  const appids:number[] = data.data!.entries.flatMap((it:any)=>it.appid)
  const appidsByOwner = data.data!.entriesByOwner.flatMap(it => it.appid!)
  const allIds = _.uniq(appids.concat(appidsByOwner))
  const appPlaytimeDict = _.groupBy(data.data!.entries,'appid')
  const appPlaytimeByOwnerDict = _.groupBy(data.data!.entriesByOwner, 'appid')
  return allIds.map(id=> {
    let res:any[] = []
    let owners = appPlaytimeByOwnerDict[id]
    let players = appPlaytimeDict[id]
    if(owners) {
      res = res.concat(owners.map(owner => ({...owner, isOwner: true})))
    }
    if(players) {
      res = res.concat(players.map(player => ({...player, isOwner: false})))
    }
    return {
      appid: id,
      players: res,
    } as SharedPlayTimeItem
  })
}
export const useFamilyPlaytime = (accessToken: string) => {
  const [sharedPlaytime, setSharedPlaytime] = useState<SharedPlayTimeItem[]>([])
  const {mutateAsync, error} =  useMutation({
    mutationFn: (
      {token,id}:{token:string,id:string},
    )=> {
      return fetchFamilyPlayTime(token, id)
    },
  })


  const fetchFamilyPlaytime = useCallback(async(familyId: string) => {
    const res = await mutateAsync({ token:accessToken, id: familyId })
    setSharedPlaytime(res)
    return res
  },[accessToken, mutateAsync])

  const reset = () => setSharedPlaytime([])
  return {
    fetchFamilyPlaytime,
    sharedPlaytime,
    reset,
    error
  }
}