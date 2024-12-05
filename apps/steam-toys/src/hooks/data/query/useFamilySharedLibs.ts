import {useMutation} from "@tanstack/react-query";
import {ProxiedAPIResponse} from "@repo/steam-proto";
import {CFamilyGroups_GetSharedLibraryApps_Response} from "@repo/steam-proto";


async function fetchFamilySharedLibs(token:string,id:string){
  const data = await fetch(`/api/steam/family/shared/${id}?access_token=${token}`)
    .then(res=>res.json() as Promise<ProxiedAPIResponse<CFamilyGroups_GetSharedLibraryApps_Response>>)

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