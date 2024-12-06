
import {SteamStdResponseType} from "@repo/steam-proto";
import {useMutation} from "@tanstack/react-query";
import {f} from '@/lib/omfetch'

async function fetchFamilyLibItems(ids:string[]){
  const data = await f.get<SteamStdResponseType<'StoreBrowse', 'GetItems'>>(`/api/steam/items/${ids.join(',')}`)
  return data
}


export const useSteamItems = () => {
    return useMutation({
      mutationFn: fetchFamilyLibItems,
    })
}