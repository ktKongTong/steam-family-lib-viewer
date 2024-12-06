import {useCallback, useMemo, useState} from "react";
import {useFamilyPlaytime} from "@/hooks/data/query/useFamilyPlaytime";
import {useSteamItems} from "@/hooks/data/query/useSteamItems";
import {useFamilyInfo} from "@/hooks/data/query/useFamilyInfo";
import {useFamilySharedLibs} from "@/hooks/data/query/useFamilySharedLibs";
import {useSteamPlayerInfo} from "@/hooks/data/query/useSteamPlayerInfo";
import {SharedLibraryStep, Step, StepStatus, WrappedStep} from "./step";
import {
  CFamilyGroups_GetFamilyGroupForUser_Response,
  CFamilyGroups_GetSharedLibraryApps_Response_SharedApp,
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails,
  StoreItem,
} from "@repo/steam-proto";
import _ from "lodash";

import {Player} from "@/interface/steamPlaytime";
import {useToast} from "@/components/ui/use-toast";
import {shaDigestAvatarBase64ToStrAvatarHash} from "@repo/shared";

type LibDetailsWithRangeIndex = Record<string, StoreItem[]>

const getSteps:()=>[Step,WrappedStep,Step] = ()=> [
  new Step( "获取基本信息"),
  new WrappedStep([
    new Step( "获取家庭借用游玩时间"),
    new Step("获取家庭成员信息"),
    new SharedLibraryStep( [],"获取家庭库存信息")
  ],"获取详情信息"),
  new Step( "完成")
]

export const useSteamFamilyLibInfo = (accessToken: string, steamid: string) => {


  const {fetchFamilyInfo, reset: resetFamilyInfo, steamFamilyInfo, error: familyInfoError} = useFamilyInfo(accessToken)

  const { fetchFamilyPlaytime, reset: resetSharedPlaytime, sharedPlaytime, error:sharedPlaytimeError} = useFamilyPlaytime(accessToken)

  const { fetchSteamPlayers, reset: resetSteamPlayers, steamPlayers, error:steamPlayersError}  = useSteamPlayerInfo(accessToken)


  const steamFamilySharedLibsQuery = useFamilySharedLibs()

  const steamItemQuery = useSteamItems()
  //
  const [steps,setSteps] = useState<[Step,WrappedStep,Step]>(getSteps())

  const [libOverviews, setLibOverviews] = useState<CFamilyGroups_GetSharedLibraryApps_Response_SharedApp[]>([])
  const [libDetailWithIndex, setLibDetailWithIndex] = useState<LibDetailsWithRangeIndex>({})

  const reset = () => {
    let curSteps = getSteps()
    if(!steps[0].ok) {
      curSteps = steps
    }
    setSteps(curSteps)
    resetFamilyInfo()
    resetSharedPlaytime()
    resetSteamPlayers()

    setLibOverviews([])
    setLibDetailWithIndex({})
    return curSteps
  }
  const [familyStep, wrappedStep, finishStep] = steps
  const [playtimeStep, memberStep, ] = wrappedStep.steps
  const sharedLibsStep = wrappedStep.steps[2] as SharedLibraryStep

  const syncStep = ()=> {
    //某个步骤的 syncStep 会导致在原始 step更新后，
    setSteps((state)=> {
      const [familyStep, wrappedStep, finishStep] = state
      const [playtimeStep, memberStep, ] = wrappedStep.steps
      const sharedLibsStep = wrappedStep.steps[2] as SharedLibraryStep
      if(playtimeStep.ok && memberStep.ok && sharedLibsStep.ok) {
        finishStep.success('')
      }else if(finishStep.ok) {
        finishStep.updateStatus(StepStatus.NotStart)
      }
      return [familyStep, wrappedStep, finishStep]
    })
  }

  // const syncSte

  const handleLibDetails = useCallback(async (key:string, idChunk: string[])=> {
    const res = await steamItemQuery.mutateAsync(idChunk)
    setLibDetailWithIndex((cur) => {
      let ans: LibDetailsWithRangeIndex = { ...cur }
      // @ts-ignore
      ans[key] = res?.data!!.storeItems!!
      return ans
    })
  }, [steamItemQuery])

  const handleSteamLibs = useCallback(async(familyId: string) => {
    syncStep()
    const libs = await steamFamilySharedLibsQuery.mutateAsync({token:accessToken, id: familyId})
    const filteredLibs = libs!.data!.apps!
      .filter( (app) => app.excludeReason == undefined || app.excludeReason == 0)
    setLibOverviews(filteredLibs as CFamilyGroups_GetSharedLibraryApps_Response_SharedApp[])
    const libIds:string[][] = _.chunk(filteredLibs.map((it)=>it.appid!.toString()), 30)

    const getKey = (index: number, size: number)=> {
      return `${index * 30 + 1}-${index * 30 + size}`
    }
    const itemsSteps = libIds.map((idChunk,index)=> new Step(`分块【${getKey(index,idChunk.length)}】库存详情信息`))
    sharedLibsStep.setSubSteps(itemsSteps)
    // 每个放到 store 中的一个 index
    const res = itemsSteps.map((it,idx) => {
      it.bindFunc(() => handleLibDetails(getKey(idx,libIds[idx].length),libIds[idx]))
      it.bindAfter(async () => syncStep())
      return it.trigger()
    })
    await Promise.allSettled(res)
    syncStep()
  },[syncStep, steamFamilySharedLibsQuery, accessToken, sharedLibsStep, handleLibDetails])

  const { toast } = useToast()

  const fetch = async ()=> {
    // 此处保证持有的最新的steps，在下一次 setState的时候同步
    // reset()
    //
    const steps = reset()
    const [familyStep, wrappedStep, finishStep] = steps
    const [playtimeStep, memberStep, ] = wrappedStep.steps
    const sharedLibsStep = wrappedStep.steps[2] as SharedLibraryStep
    // step 1
    // syncStep 导致 rerender，但是持有还是原来的step，
    // 但是在rerender 之前，立马就开始下一轮了请求
    const steamFamily = await familyStep.trigger(() => fetchFamilyInfo())
    if(steamFamily?.isNotMemberOfAnyGroup === true) {
      familyStep.failed('用户不处于任何家庭中',false)
      sharedLibsStep.failed('用户不处于任何家庭中',false)
      playtimeStep.failed('用户不处于任何家庭中',false)
      memberStep.failed('用户不处于任何家庭中',false)
      wrappedStep.failed('用户不处于任何家庭中',false)
      finishStep.failed('用户不处于任何家庭中',false)
      syncStep()
      toast({
        title: '获取失败',
        description: '用户还未处于任何家庭中，无法生成家庭库存图'
      })
      return
    }

    const familyId = steamFamily!.familyGroupid!!.toString()
    const memberIds =steamFamily!.familyGroup!.members!.map((member)=>member.steamid!.toString())
    playtimeStep.bindFunc(async () => fetchFamilyPlaytime(familyId))
    memberStep.bindFunc(async () => fetchSteamPlayers(memberIds))
    sharedLibsStep.bindFunc(async () => handleSteamLibs(familyId))

    playtimeStep.bindAfter(async ()=>{syncStep()})
    memberStep.bindAfter(async ()=>{syncStep()})
    sharedLibsStep.bindAfter(async ()=>{syncStep()})

    await wrappedStep.trigger(async () => Promise.allSettled([
        playtimeStep.trigger(),
        memberStep.trigger(),
      sharedLibsStep.trigger()
    ]))
    syncStep()
  }
  const {
    allLibs,
    allMembers,
  } = useComputedLibAndMember(steamFamilyInfo,steamPlayers,libOverviews,libDetailWithIndex)

  // 此处setSteps没有先于steamFamilyInfo更新，Why？
  const dataLoaded = steamFamilyInfo!=null && !steamFamilyInfo.isNotMemberOfAnyGroup && finishStep.ok
  const canDisplay = steamFamilyInfo!=null && !steamFamilyInfo.isNotMemberOfAnyGroup && playtimeStep.ok && memberStep.ok
  // console.log("execute agagin", steamFamilyInfo)
  // console.log("familyStep",  familyStep.id)
  // console.log("wrappedStep",  wrappedStep.id)
  // console.log("playtimeStep",  playtimeStep.id)
  // console.log("memberStep", memberStep.id)
  // console.log("sharedLibsStep", sharedLibsStep.id)
  // console.log("finishStep",  finishStep.id)
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


// 基于已有数据计算家庭成员信息，
const useComputedLibAndMember = (
  steamFamilyInfo: CFamilyGroups_GetFamilyGroupForUser_Response | null,
  steamPlayers: CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails[],
  libOverviews: CFamilyGroups_GetSharedLibraryApps_Response_SharedApp[],
  libDetailWithIndex: LibDetailsWithRangeIndex,
) => {
  const allMembers = useMemo(()=>{
    if(!steamFamilyInfo || steamFamilyInfo.isNotMemberOfAnyGroup) {
      return [] as Player[]
    }

    const memberFamilyInfos = _.keyBy(steamFamilyInfo!.familyGroup!.members, 'steamid')
    return steamPlayers!.map((account)=> {
      const id = account!.publicData!.steamid!.toString()
      const avatar_hash = shaDigestAvatarBase64ToStrAvatarHash(account!.publicData!.shaDigestAvatar!.toString())
      return {
        ...account.publicData,
        avatar_hash,
        ...memberFamilyInfos[id]
      } as Player
    })
  },[steamPlayers, steamFamilyInfo])

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
    allLibs,
    allMembers,
  }
}
