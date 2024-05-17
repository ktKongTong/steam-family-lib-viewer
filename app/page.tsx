'use client'
import _ from 'lodash'
import React, {useMemo, useState} from 'react';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {shaDigestAvatarBase64ToStrAvatarHash} from "@/lib/steam_utils";
import DataGraph from "@/app/datagraph";
import Header from "@/app/header";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import {RetryableStep, statusToEmoji, Step} from "@/app/step";
import GetToken from "@/app/GetToken";
import {
  CFamilyGroups_GetFamilyGroupForUser_Response,
  CFamilyGroups_GetPlaytimeSummary_Response,
  CFamilyGroups_GetSharedLibraryApps_Response,
  CFamilyGroups_GetSharedLibraryApps_Response_SharedApp,
  CFamilyGroups_PlaytimeEntry,
  FamilyGroupMember
} from "@/proto/gen/web-ui/service_familygroups_pb";
import {
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicData
} from "@/proto/gen/web-ui/service_player_pb";
import {CStoreBrowse_GetItems_Response, StoreItem} from "@/proto/gen/web-ui/common_pb";
import {useToast} from "@/components/ui/use-toast";
import {SteamAppPlaytime, SteamPlaytimeItem, SteamPlaytimeResponse} from "@/interface/steamPlaytime";
import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {Message} from "@bufbuild/protobuf";

dayjs.extend(relativeTime)

function validToken(token:JwtPayload|null)  {
  if(!token || !token.exp) {

    return {
      res: false,
      reason: "无法提取出有效的 token 信息"
    }
  }
  const res = dayjs.unix(token.exp).isAfter(dayjs())
  return {
    res: res,
    reason: res ? 'success':`token 已于${dayjs.unix(token.exp).format('YY-MM-DD HH:mm:ss')}失效`
  }
}


async function fetchFamilyInfo(token:string):Promise<null| ProxiedAPIResponse<CFamilyGroups_GetFamilyGroupForUser_Response>>{
  const data = await fetch(`/api/steam/family?access_token=${token}`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}
async function fetchFamilyPlayTime(token:string,id:string) {
  const data = (await fetch(`/api/steam/family/playtime/${id}?access_token=${token}`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })) as ProxiedAPIResponse<CFamilyGroups_GetPlaytimeSummary_Response>
  console.log(data.data)
  const appids:number[] = data.data!.entries.flatMap((it:any)=>it.appid)
  const appidsByOwner = data.data!.entriesByOwner.flatMap(it => it.appid!)
  const allIds = _.uniq(appids.concat(appidsByOwner))
  const appPlaytimeDict = _.groupBy(data.data!.entries,'appid')
  const appPlaytimeByOwnerDict = _.groupBy(data.data!.entriesByOwner, 'appid')
  return allIds.map(id=> {
    let res:any[] = []
    let owners = appPlaytimeByOwnerDict[id]
    let players = appPlaytimeDict[id]
    if(owners) {
      res = res.concat(owners.map(owner => ({...owner, isOwner: true}))
      )
    }
    if(players) {
      res = res.concat(players.map(player => ({...player, isOwner: false})))
    }
    return {
      appid: id,
      players: res as (CFamilyGroups_PlaytimeEntry & {isOwner:boolean})[],
    }
  })
}
async function fetchFamilyMembers(token:string,ids:string[]){
  const data = await fetch(`/api/steam/player/${ids.join(',')}?access_token=${token}`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}

async function fetchFamilySharedLibs(token:string,id:string){
  const data = await fetch(`/api/steam/family/shared/${id}?access_token=${token}`)
    .then(res=>res.json() as Promise<ProxiedAPIResponse<CFamilyGroups_GetSharedLibraryApps_Response>>)
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}

async function fetchFamilyLibItems(ids:string[]){
  const data = await fetch(`/api/steam/items/${ids.join(',')}`)
    .then(res=>res.json() as Promise<ProxiedAPIResponse<CStoreBrowse_GetItems_Response>>)
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}
async function getRandomBackground(){
  const data = await fetch(`https://moe.anosu.top/img/?type=json`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data.pics[0] as string
}

export type Player = FamilyGroupMember & CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicData & {
  avatar_hash: string
}
export type App = CFamilyGroups_GetSharedLibraryApps_Response_SharedApp
  & {  detail: StoreItem }
  & { owners: Player[] }
  & { playtime?: any }
export default function Home() {
  const [tokenInput,setToken] = useState('')
  const jwtInfo = useMemo(()=> {
    try {
      return jwtDecode(tokenInput)
    }catch (e) {return null}
  },[tokenInput])
  const [steps,setSteps] = useState<Step[]>([])
  const [inputActive, setInputActive] = useState(true)

  const [familyInfo,setFamilyInfo] = useState<any>(null)
  const [allMember,setAllMember] = useState<Player[]>([])
  const [libDictionary, setLibDictionary] = useState<any>()
  const [allLibs, setAllLibs] = useState<any[]>([])
  const [libsPlaytime,setLibsPlaytime] = useState<SteamAppPlaytime[]>([])
  const [dataLoaded,setDataLoaded] = useState(false)
  const [background, setBackground] = useState("https://pic.rmb.bdstatic.com/bjh/85b8180794c573eba31c2e498bb40714.jpeg")
  const onSubmit = async ()=> {
    setDataLoaded(false)
    getRandomBackground().then(res=> {if(res) {setBackground(res)}})
    const familyStep = new RetryableStep(() => fetchFamilyInfo(tokenInput), "获取家庭信息")
    const memberStep = new Step()
    const libsStep = new Step()
    const steps = [familyStep,memberStep,libsStep]
    setSteps(steps)
    const familyInfo = await familyStep.trigger()
    if (!familyInfo) {
      toast({
        title:"获取家庭信息失败",
        description: familyStep.message
      })
    }
    setFamilyInfo(familyInfo)
    let familyGroupId = familyInfo!.data!.familyGroupid!
    let familyData = familyInfo?.data?.familyGroup!
    const familyName = familyData.name!!
    const memberIds =familyData.members!.map((member)=>member.steamid!.toString())
    const memberFamilyInfos = _.keyBy(familyData.members, 'steamid')
    familyStep.success(`成功获取家庭信息，你好，${familyName} 的成员，更多数据正在赶来的路上`)
    libsStep.trigger('正在获取共享库存信息')
    memberStep.trigger('正在获取家庭成员信息')
    setSteps([...steps])
    const [libsPlaytimeSummary,libOverviewInfos,memberInfos] = await Promise.all([
      fetchFamilyPlayTime(tokenInput, familyGroupId.toString()),
      fetchFamilySharedLibs(tokenInput, familyGroupId.toString()),
      fetchFamilyMembers(tokenInput, memberIds)
    ])
    console.log("loadedtime")
    console.log(libsPlaytimeSummary)
    setLibsPlaytime(libsPlaytimeSummary)
    if (!libOverviewInfos) {
      libsStep.failed('获取共享库存信息失败')
    }else {
      libsStep.success('成功获取共享库存信息')
    }
    if (!memberInfos) {
      memberStep.failed('获取家庭成员信息失败')
    }else {
      memberStep.success('成功获取家庭成员信息')
    }
    if(!libOverviewInfos || !memberInfos ) {
      return
    }
    setSteps([...steps])
    const members:Player[] = memberInfos.data.accounts.map((account:any)=> {
      const id = account?.publicData?.steamid!
      const avatar_hash = shaDigestAvatarBase64ToStrAvatarHash(account?.publicData?.shaDigestAvatar?.toString())
      return {
        ...account.publicData,
        avatar_hash,
        ...memberFamilyInfos[id]
      }
    })
    setAllMember(members)
    const memberDict = _.keyBy(members, 'steamid')

    const libs = libOverviewInfos.data!.apps
      .filter( (app:any) => app.excludeReason == undefined || app.excludeReason == 0)

    const libIds:string[][] = _.chunk(libs.map((it:any)=>it.appid.toString()), 30)
    const itemsSteps = libIds.map((idChunk,index)=> new RetryableStep(async ()=>{
      return await fetchFamilyLibItems(idChunk)
    },`分块【${index * 30 + 1}-${index * 30 + idChunk.length}】的库存详情信息`))

    setSteps([...steps,...itemsSteps])
    const res = await Promise.all(libIds.map(async (idChunk,index) => {
      const curStep = itemsSteps[index]
      const stepRes = curStep.trigger()
      setSteps([...steps,...itemsSteps])
      const res = await stepRes
      if (!res || res!.data!.storeItems.length == 0) {
        curStep.failed()
      }else {
        curStep.success()
      }
      setSteps([...steps,...itemsSteps])
      return res
    }))
    const items = res
      .filter((it,index) => {
        return !(!it || it.data!.storeItems.length == 0);
      })
    .map(resp=>resp!.data!.storeItems).flatMap(it=>it)
    const libDictionary = _.keyBy(items, 'id')
    const allLib = libs.map((lib)=> ({
      ...lib,
        detail: libDictionary[lib.appid!],
        owners:lib.ownerSteamids.map((id) => {
          // console.log("id",id)
          // console.log("member",memberDict[id])
          return memberDict[id.toString()]
        })
    }))
    setAllLibs(allLib)
    setLibDictionary(libDictionary)
    const finalStep = new Step()
    finalStep.success("已获取库存详情信息")
    setSteps([...steps, ...itemsSteps, finalStep])
    setDataLoaded(true)
  }
  const {toast} = useToast()
  const onSubmitWrapper = ()=> {
    const {res,reason} = validToken(jwtInfo)
    if(res) {
      setInputActive(false)
      onSubmit()
      setInputActive(true)
    }else {
      toast({
        title: "AccessToken 无效",
        description: reason,
      })
    }
  //
  }
  // const
  return (
    <main className="flex min-h-screen flex-col items-center max-w-[1024px] ml-auto mr-auto">
      <Header/>
      <div className={"flex flex-col w-full min-w-full md:min-w-96 px-4 md:px-20"}>
        <div className={'flex items-center space-x-2'}>
          <div className={"text-lg font-semibold py-2"}>AccessToken</div>
          <GetToken/>
        </div>
        <div className={'flex flex-col md:flex-row'}>
          <div
            className={"max-w-96 space-y-2"}
          >
            <Textarea
              placeholder="Type your access_token here."
              className={'min-h-80 min-w-full md:min-w-96'}
              value={tokenInput}
              onChange={(e) => {setToken(e.target.value)}}
              disabled={!inputActive}
            />
            {
              tokenInput.length > 0 && !jwtInfo &&
                <div className={"text-xs text-red-500 font-light py-0.5"}>
                    <span>无法提取steamId，似乎不是一个正确的 token</span>
                </div>
            }
          </div>
          <div className={"pl-4"}>
            <div className={"max-h-80 overflow-y-auto scrollbar-none"}>
              <div className={""}>
                {
                  jwtInfo && jwtInfo.sub &&
                    <div className={'flex items-center space-x-2'}>
                        <Label>steam ID</Label>
                        <span> {jwtInfo.sub}</span>
                    </div>
                }
                {
                  jwtInfo && jwtInfo.exp &&
                    <div className={'flex items-center space-x-2'}>
                        <Label>token 过期时间</Label>
                        <span> {dayjs.unix(jwtInfo.exp).format('MM月DD日 HH:mm:ss')}</span>
                    </div>
                }
              </div>
              {
                steps
                  .filter(step => step.isTriggered())
                  .map((step, index) =>
                    <div key={index} className={"space-x-2 text-xs font-light"}>
                    <span
                      className={cn()}
                    >{statusToEmoji(step.stepStatus)}</span>
                      <span>{step.message}</span>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
        <Button variant={'ghost'} className={"ml-auto mr-2 w-fit my-4"}
                disabled={!inputActive}
                onClick={onSubmitWrapper}
        >提交</Button>
      </div>
      {
        dataLoaded &&
          <DataGraph libs={allLibs} players={allMember} libsPlaytime={libsPlaytime} family={familyInfo}
                     bg={background}/>
      }
    </main>
  );
}
