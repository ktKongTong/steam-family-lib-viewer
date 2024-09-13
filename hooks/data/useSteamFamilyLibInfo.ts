import {useMutation} from "@tanstack/react-query";
import {useCallback, useMemo, useState} from "react";
import {useSteamItems} from "@/hooks/data/useSteamItems";
import {SharedPlayTimeItem, useFamilyPlaytime} from "@/hooks/data/useFamilyPlaytime";
import {useFamilyInfo} from "@/hooks/data/useFamilyInfo";
import {useFamilySharedLibs} from "@/hooks/data/useFamilySharedLibs";
import {useSteamPlayerInfo} from "@/hooks/data/useSteamPlayerInfo";
import {RetryableStep, Step} from "@/app/step";
import {
  CFamilyGroups_GetFamilyGroupForUser_Response, CFamilyGroups_GetSharedLibraryApps_Response_SharedApp,
} from "@/proto/gen/web-ui/service_familygroups_pb";
import _ from "lodash";
import {CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails} from "@/proto/gen/web-ui/service_player_pb";
import {CStoreBrowse_GetItems_Response, StoreItem} from "@/proto/gen/web-ui/common_pb";
import {shaDigestAvatarBase64ToStrAvatarHash} from "@/lib/steam_utils";
import {Player} from "@/app/page";

/*
* prepare
* fetch family
* 1. playtime, 2. sharedLibs, 3. playerInfo
*              2.2 steamItems// parallel maybe many request
* compute
* finished
* */

enum FetchStage {
  Prepare,
  FetchFamily,

  ParallelFetchPlayTimeAndSharedLibsAndFetch,

}
// detailStep

export class SharedLibraryStep extends Step {
  steps: Step[] = []
  setSubSteps(steps: Step[]) {
    this.steps = steps
  }
}

interface FamilyLibInfo {
  familyLibInfo: any,
  membersInfo: any,
  playtimeInfo: any,
  sharedLibsInfo: any,
  sharedLibsDetails: any,
}

type LibDetailsWithRangeIndex = Record<string, StoreItem[]>

const getSteps:()=>[Step,[Step,Step,SharedLibraryStep],Step] = ()=> [
  new Step( "获取赛博家庭基本信息"),
  [
    new Step( "获取家庭借用游玩时间"),
    new Step("获取家庭成员信息"),
    new SharedLibraryStep( "获取家庭库存信息")
  ],
  new Step( "完成")
]

export const useSteamFamilyLibInfo = (accessToken: string, steamid: string) => {


  const steamFamilyInfoQuery = useFamilyInfo()

  const steamPlayersInfoQuery = useSteamPlayerInfo()

  const steamFamilyPlaytimeQuery = useFamilyPlaytime()

  const steamFamilySharedLibsQuery = useFamilySharedLibs()

  const steamItemQuery = useSteamItems()


  const [dataLoaded,setDataLoaded] = useState(false)
  const [canDisplay,setCanDisplay] = useState(false)

  const [steps,setSteps] = useState(getSteps())
    // console.log("init state", JSON.parse(JSON.stringify(steps)))
  const [familyStep, [playtimeStep, memberStep, sharedLibsStep], finishStep] = steps

  const syncStep = ()=> {
    // console.log("syncing step", JSON.parse(JSON.stringify(steps)))
    setSteps([familyStep, [playtimeStep, memberStep, sharedLibsStep], finishStep])
  }
  const [steamFamilyInfo, setSteamFamilyInfo] = useState<CFamilyGroups_GetFamilyGroupForUser_Response | null>(null)
  const [sharedPlaytime, setSharedPlaytime] = useState<SharedPlayTimeItem[] | null>(null)
  const [familyMembers, setFamilyMembers] = useState<CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails[] | null>(null)
  const [libOverviews, setLibOverviews] = useState<CFamilyGroups_GetSharedLibraryApps_Response_SharedApp[]>([])

  const [libDetailWithIndex, setLibDetailWithIndex] = useState<LibDetailsWithRangeIndex>({})
  // 处理 steamFamily // 这一步失败后续都不可以进行，这个retry 本身就是re fetch
  const handleFamily = useCallback(async() => {
    const steamFamily = await steamFamilyInfoQuery.mutateAsync(accessToken).then(res=>res!.data)
    setSteamFamilyInfo(steamFamily)
    return steamFamily
  },[accessToken])

  const handlePlaytime = useCallback(async(familyId: string) => {
    const res = await steamFamilyPlaytimeQuery.mutateAsync({ token:accessToken, id: familyId })
    setSharedPlaytime(res)
    return res
  },[accessToken])
  const handleMembers = useCallback(async(memberIds: string[]) => {
    const res = await steamPlayersInfoQuery.mutateAsync({ token:accessToken, ids: memberIds })
    // 设置 steamFamily
    setFamilyMembers(res?.data?.accounts!)
    return res
  },[accessToken])

  const handleLibDetails = useCallback(async (key:string, idChunk: string[])=> {
    const res = await steamItemQuery.mutateAsync(idChunk)
    setLibDetailWithIndex((cur) => {
      let ans: LibDetailsWithRangeIndex = {
        ...cur
      }
      ans[key] = res?.data!!.storeItems!!
      return ans
    })
  }, [setLibDetailWithIndex])

  const handleSteamLibsWithStep = useCallback(async(familyId: string) => {
    syncStep()
    const libs = await steamFamilySharedLibsQuery.mutateAsync({token:accessToken, id: familyId})
    const filteredLibs = libs!.data!.apps
      .filter( (app:any) => app.excludeReason == undefined || app.excludeReason == 0)
    setLibOverviews(filteredLibs)
    const libIds:string[][] = _.chunk(filteredLibs.map((it)=>it.appid!.toString()), 30)

    const getKey = (index: number, size: number)=> {
      return `${index * 30 + 1}-${index * 30 + size}`
    }
    const itemsSteps = libIds.map((idChunk,index)=> new Step(`分块【${getKey(index,idChunk.length)}】库存详情信息`))
    sharedLibsStep.setSubSteps(itemsSteps)
    // 每个放到 store 中的一个 index
    const res = itemsSteps.map((it,idx) => it.trigger(() => handleLibDetails(getKey(idx,libIds[idx].length),libIds[idx]).then(syncStep)))
    await Promise.all(res)
    syncStep()
    return libs
  },[syncStep, accessToken])


  const fetch = async ()=> {
    // step 1
    // 五个 step 本身不变，区别在于 step 持有的 message 变化，但是通过变更
    syncStep()
    const steamFamily = await familyStep.trigger(() => handleFamily())
    syncStep()
    const familyId = steamFamily!.familyGroupid!!.toString()
    const memberIds =steamFamily!.familyGroup!.members!.map((member)=>member.steamid!.toString())
    syncStep()
    // step2
    await Promise.all([
      Promise.all([
        playtimeStep.trigger(()=> handlePlaytime(familyId).then(syncStep)),
        memberStep.trigger(() => handleMembers(memberIds).then(syncStep))
      ]).then(() => setCanDisplay(true)),
      sharedLibsStep.trigger(()=> handleSteamLibsWithStep(familyId).then(syncStep))
    ])
    syncStep()
    // step3
    finishStep.success('')
    setDataLoaded(true)
  }
  const allMembers = useMemo(()=>{
    if(!familyMembers) {
      return [] as Player[]
    }
    const memberFamilyInfos = _.keyBy(steamFamilyInfo!.familyGroup!.members, 'steamid')
    return familyMembers!.map((account)=> {
      const id = account!.publicData!.steamid!.toString()
      const avatar_hash = shaDigestAvatarBase64ToStrAvatarHash(account!.publicData!.shaDigestAvatar!.toString())
      return {
        ...account.publicData,
        avatar_hash,
        ...memberFamilyInfos[id]
      } as Player
    })
  },[familyMembers])

  const memberDict = useMemo(()=>{
    return _.keyBy(allMembers, 'steamid')
  },[allMembers])

  const curLibDetails = useMemo(()=> {
    // todo
    // console.log("curLibDetails", libDetailWithIndex)
    return Object.values(libDetailWithIndex).flatMap(it => it)
  }, [libDetailWithIndex])

  const libDictionary = useMemo(()=>_.keyBy(curLibDetails, 'id'), [curLibDetails])

  const allLibs = useMemo(()=>{
    const filtered =  libOverviews
      // 筛选出不包含 xxx 的时间
      .filter((lib) => {
        const dic = libDictionary[lib.appid!]

        // console.log("lib",lib.appid, dic)
        return !!libDictionary[lib.appid!]
      })
      .map((lib)=> ({
        ...lib,
        detail: libDictionary[lib.appid!],
        owners:lib.ownerSteamids.map((id) => {return memberDict[id.toString()]})
      }))
    return filtered
  }, [libOverviews, libDictionary, memberDict])

  return {
    dataLoaded,
    canDisplay,
    fetch,
    steps,
    libOverviews,
    libDetailWithIndex,

    steamFamilyInfo,
    sharedPlaytime,
    allLibs,
    allMembers
  }

}