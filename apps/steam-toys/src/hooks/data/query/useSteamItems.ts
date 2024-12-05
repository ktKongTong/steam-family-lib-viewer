import {ProxiedAPIResponse} from "@repo/steam-proto";
import {CStoreBrowse_GetItems_Response} from "@repo/steam-proto";
import {useMutation} from "@tanstack/react-query";


async function fetchFamilyLibItems(ids:string[]){
  const data = await fetch(`/api/steam/items/${ids.join(',')}`)
    .then(res=>res.json() as Promise<ProxiedAPIResponse<CStoreBrowse_GetItems_Response>>)

  return data
}


export const useSteamItems = () => {
    return useMutation({
      mutationFn: fetchFamilyLibItems,
    })
}