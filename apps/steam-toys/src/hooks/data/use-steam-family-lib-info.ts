// import {useQueries, useQuery} from "@tanstack/react-query";
// import {APIService} from "@/hooks/data/query/api";
// import _ from "lodash";
// import {useState} from "react";
//
// export const useSteamFamilyLibInfo = (accessToken: string)=> {
//
//   const [start, setStart] = useState(false)
//
//   const {
//     data: steamFamilyInfo,
//     isError,
//     isFetching,
//     isPlaceholderData
//   } = useQuery({
//     queryKey: ["steam-family-info"],
//     queryFn: async () => APIService.getFamilyGroupForUser(accessToken),
//     enabled: start,
//     refetchIntervalInBackground: false,
//     placeholderData: undefined
//   })
//
//   const familyStep = {
//     status: isFetching,
//   }
//
//   const canNextStage = !!steamFamilyInfo
//
//   const { data: playTimeSummary } = useQuery({
//     queryKey: ["steam-family-info"],
//     queryFn: async () => APIService.getPlaytimeSummary({accessToken, familyId: steamFamilyInfo!.familyGroupid!}),
//     enabled: canNextStage,
//   })
//   const {
//     data: players,
//   } = useQuery({
//     queryKey: ["get-player-links"],
//     queryFn: async () => APIService.getPlayerLinkDetails({accessToken, steamids: steamFamilyInfo!.familyGroup!.members!.map(it=>it.steamid!.toString())}),
//     enabled: canNextStage,
//   })
//
//   const {
//     data: sharedApps,
//   } = useQuery({
//     queryKey: ["get-shared-libs", steamFamilyInfo?.familyGroupid],
//     queryFn: async () => APIService.getSharedLibraryApps({accessToken, familyId: steamFamilyInfo!.familyGroupid!}),
//     enabled: canNextStage,
//   })
//
//   const appChunks = _.chunk(sharedApps?.apps??[], 30)
//
//   const appQueries = useQueries({
//     queries: appChunks.map((apps,idx) => ({
//       queryKey: ["app-chunk", steamFamilyInfo?.familyGroupid ,idx],
//       queryFn: () => APIService.getStoreItems(apps.map(it=>it.appid!.toString())),
//       enabled: appChunks.length > 0,
//     })),
//   });
//
//
//   const stepStatus = []
//
//   const canDisplay = false
//   const isOk = false
//
//   return {
//
//   }
//
// }