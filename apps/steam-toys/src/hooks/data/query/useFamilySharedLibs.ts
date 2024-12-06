import {useMutation} from "@tanstack/react-query";
import { SteamStdResponseType } from "@repo/steam-proto";

import {
  f
} from '@/lib/omfetch'

async function fetchFamilySharedLibs(token:string,id:string){
  const data = await f.get<SteamStdResponseType<'FamilyGroups', 'GetSharedLibraryApps'>>(`/api/steam/family/shared/${id}?access_token=${token}`)
  return data
}
export const useFamilySharedLibs = () => {
  return useMutation({
    mutationFn: (
      {token,id}:{token:string,id:string},
    )=> {
      return fetchFamilySharedLibs(token, id)
    },
  })
}