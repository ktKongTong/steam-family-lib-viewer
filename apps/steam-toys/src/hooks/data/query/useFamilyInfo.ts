
import { SteamStdResponseType} from "@repo/steam-proto";
import {useMutation} from "@tanstack/react-query";
import {useCallback, useState} from "react";

type NotUndefined<T> = T extends undefined ? never : T

type Family = NotUndefined<SteamStdResponseType<'FamilyGroups', 'GetFamilyGroupForUser'>['data']>
async function fetchFamilyInfo(token:string) {
  const data = await fetch(`/api/steam/family?access_token=${token}`)
    .then(res=>res.json()) as SteamStdResponseType<'FamilyGroups', 'GetFamilyGroupForUser'>
  return data
}

export const useFamilyInfo = (accessToken: string) => {
  const [steamFamilyInfo, setSteamFamilyInfo] = useState<Family | null>(null)

  const { mutateAsync,error } = useMutation({
    mutationFn: fetchFamilyInfo,
  })
  const fetchFamily = useCallback(async() => {
    const steamFamily = await mutateAsync(accessToken)

    if(steamFamily.success) {
      setSteamFamilyInfo(steamFamily.data!)
      return steamFamily.data!
    }
    return null
  },[accessToken, mutateAsync])

  const reset = () => setSteamFamilyInfo(null)

  return {
    fetchFamilyInfo: fetchFamily,
    reset,
    steamFamilyInfo,
    error
  }

}