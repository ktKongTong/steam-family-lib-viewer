import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {CFamilyGroups_GetFamilyGroupForUser_Response} from "@/proto/gen/web-ui/service_familygroups_pb";
import {useMutation} from "@tanstack/react-query";

export const useFamilyInfo = () => {

  async function fetchFamilyInfo(token:string):Promise<null| ProxiedAPIResponse<CFamilyGroups_GetFamilyGroupForUser_Response>>{
    const data = await fetch(`/api/steam/family?access_token=${token}`)
      .then(res=>res.json())
      .catch(e=> {
        console.log(e)
        return null
      })
    return data
  }

  return useMutation({
    mutationFn: fetchFamilyInfo,
  })

}