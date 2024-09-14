
import {CFamilyGroups_GetFamilyGroupForUser_Response} from "@/proto/gen/web-ui/service_familygroups_pb";
import {useMutation} from "@tanstack/react-query";
import {useCallback, useState} from "react";


async function fetchFamilyInfo(token:string):Promise<null| CFamilyGroups_GetFamilyGroupForUser_Response>{
  const data = await fetch(`/api/steam/family?access_token=${token}`)
    .then(res=>res.json()).then(res=>res!.data)
  data.familyGroupid!!
  return data
}

export const useFamilyInfo = (accessToken: string) => {
  const [steamFamilyInfo, setSteamFamilyInfo] = useState<CFamilyGroups_GetFamilyGroupForUser_Response | null>(null)

  const { mutateAsync,error } = useMutation({
    mutationFn: fetchFamilyInfo,
  })
  const fetchFamily = useCallback(async() => {
    // console.log("request Family")
    const steamFamily = await mutateAsync(accessToken)
    // console.log("set Family")
      setSteamFamilyInfo(steamFamily)

    return steamFamily
  },[accessToken, mutateAsync])

  const reset = () => setSteamFamilyInfo(null)

  return {
    fetchFamilyInfo: fetchFamily,
    reset,
    steamFamilyInfo,
    error
  }

}