import {useCallback, useMemo, useState} from "react";
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
import {useMutate} from "@/hooks/data/query/use-mutate";
import {APIService} from "@/hooks/data/query/api";

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


  const {mutateAsync: fetchFamilyInfo, reset: resetFamilyInfo, data: steamFamilyInfo, error: familyInfoError} = useMutate(APIService.getFamilyGroupForUser)

  const { mutateAsync: fetchFamilyPlaytime, data: _sharedPlaytime, error:sharedPlaytimeError, reset:resetSharedPlaytime} =  useMutate(APIService.getPlaytimeSummary)

  const sharedPlaytime = _sharedPlaytime ?? []

  const { mutateAsync: fetchSteamPlayers, data: _steamPlayers, error:steamPlayersError, reset: resetSteamPlayers } = useMutate(APIService.getPlayerLinkDetails)

  const steamPlayers = _steamPlayers?.accounts ?? []

  const steamFamilySharedLibsQuery = useMutate(APIService.getSharedLibraryApps)

  const steamItemQuery = useMutate(APIService.getStoreItems)
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

  const handleLibDetails = useCallback(async (key:string, idChunk: string[])=> {
    const res = await steamItemQuery.mutateAsync(idChunk)
    setLibDetailWithIndex((cur) => {
      let ans: LibDetailsWithRangeIndex = { ...cur }
      ans[key] = res.storeItems!
      return ans
    })
  }, [steamItemQuery])

  const handleSteamLibs = useCallback(async(familyId: string) => {
    syncStep()
    const libs = await steamFamilySharedLibsQuery.mutateAsync({accessToken, familyId: familyId})
    const filteredLibs = libs!.apps!
      .filter( (app) => app.excludeReason == undefined || app.excludeReason == 0)
    setLibOverviews(filteredLibs as CFamilyGroups_GetSharedLibraryApps_Response_SharedApp[])
    const libIds:string[][] = _.chunk(filteredLibs.map((it)=>it.appid!.toString()), 30)

    const getKey = (index: number, size: number)=> {
      return `${index * 30 + 1}-${index * 30 + size}`
    }
    const itemsSteps = libIds.map((idChunk,index)=> new Step(`分块【${getKey(index,idChunk.length)}】库存详情信息`))
    sharedLibsStep.setSubSteps(itemsSteps)
    const res = itemsSteps.map((it,idx) => {
      it.bindFunc(() => handleLibDetails(getKey(idx,libIds[idx].length),libIds[idx]))
      it.bindAfter(async () => syncStep())
      return it.trigger()
    })
    await Promise.allSettled(res)
    syncStep()
  },[syncStep, steamFamilySharedLibsQuery, accessToken, sharedLibsStep, handleLibDetails])

  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const fetch = async ()=> {
    setLoading(true)
    // 此处保证持有的最新的steps，在下一次 setState的时候同步
    const steps = reset()
    const [familyStep, wrappedStep, finishStep] = steps
    const [playtimeStep, memberStep, ] = wrappedStep.steps
    const sharedLibsStep = wrappedStep.steps[2] as SharedLibraryStep
    const steamFamily = await familyStep.trigger(() => fetchFamilyInfo(accessToken))

    if(!steamFamily) {
      familyStep.failed("获取失败")
      toast({
        title: '获取失败',
        description: '获取用户家庭信息失败，请检查 Token 是否正确'
      })
      setLoading(false)
      return
    }
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
      setLoading(false)
      return
    }

    const familyId = steamFamily!.familyGroupid!!.toString()
    const memberIds =steamFamily!.familyGroup!.members!.map((member)=>member.steamid!.toString())
    playtimeStep.bindFunc(async () => fetchFamilyPlaytime({accessToken, familyId}))
    memberStep.bindFunc(async () => fetchSteamPlayers({accessToken, steamids: memberIds}))
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
    setLoading(false)
  }
  const {
    allLibs,
    allMembers,
  } = useComputedLibAndMember(steamFamilyInfo,steamPlayers,libOverviews,libDetailWithIndex)
  const dataLoaded = steamFamilyInfo!=null && !steamFamilyInfo.isNotMemberOfAnyGroup && finishStep.ok
  const canDisplay = steamFamilyInfo!=null && !steamFamilyInfo.isNotMemberOfAnyGroup && playtimeStep.ok && memberStep.ok
  return {
    dataLoaded,
    loading,
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
  steamFamilyInfo: CFamilyGroups_GetFamilyGroupForUser_Response | null | undefined,
  steamPlayers: CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails[],
  libOverviews: CFamilyGroups_GetSharedLibraryApps_Response_SharedApp[],
  libDetailWithIndex: LibDetailsWithRangeIndex,
) => {
  const allMembers = useMemo(()=>{
    if(!steamFamilyInfo || steamFamilyInfo.isNotMemberOfAnyGroup) {
      return [] as Player[]
    }

    const memberFamilyInfos = _.keyBy(steamFamilyInfo.familyGroup!.members, 'steamid')
    return steamPlayers!.map((account)=> {
      const id = account!.publicData!.steamid!.toString()
      const avatar_hash = shaDigestAvatarBase64ToStrAvatarHash(account.publicData!.shaDigestAvatar!.toString())
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
    return Object.values(libDetailWithIndex).flat()
  }, [libDetailWithIndex])

  const libDictionary = useMemo(()=>_.keyBy(curLibDetails, 'id'), [curLibDetails])

  const allLibs = useMemo(()=>{
    const filtered =  libOverviews
      // 筛选出不包含 xxx 的时间
      .filter((lib) => {
        const dic = libDictionary[lib.appid!]
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
