import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {CStoreBrowse_GetItems_Response} from "@/proto/gen/web-ui/common_pb";
import {useMemo} from "react";
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