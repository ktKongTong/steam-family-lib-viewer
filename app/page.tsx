'use client'
import _ from 'lodash'
import React, { useMemo, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {shaDigestAvatarBase64ToStrAvatarHash} from "@/lib/steam_utils";
import DataGraph from "@/app/datagraph";
import Header from "@/app/header";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
dayjs.extend(relativeTime)

function validToken(token:string) {
  return ""
}

interface Step {
  status: string,
  message: string
}

async function fetchFamilyInfo(token:string):Promise<null|any>{
  const data = await fetch(`/api/steam/family?access_token=${token}`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
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
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}

async function fetchFamilyLibItems(ids:string[]){
  const data = await fetch(`/api/steam/items/${ids.join(',')}`)
    .then(res=>res.json())
    .catch(e=> {
      console.log(e)
      return null
    })
  return data
}

// type StepStatus = 'ok' | 'processing' | 'error'
enum StepStatus {
  NotStart,
  OK,
  Processing,
  Error,
}
class Step {
  stepStatus: StepStatus = StepStatus.NotStart
  message:string = ""
  constructor(message?: string) {
    if(message) {
      this.message = message
    }
  }
  updateStatus(status:StepStatus, message?:string) {
    this.stepStatus = status
    if(message) {
      this.message = message
    }
  }
  trigger (message:string){
      this.stepStatus = StepStatus.Processing
      this.message = message
  }
  failed(message: string) {
    this.stepStatus = StepStatus.Error
    this.message = message
  }
  success(message: string) {
    this.stepStatus = StepStatus.OK
    this.message = message
  }
  isTriggered() {
    return this.stepStatus !== StepStatus.NotStart
  }
}

const statusToEmoji = (status:StepStatus)=> {
  if(status === StepStatus.OK) {
    return `✅`
  }
  if(status === StepStatus.Processing) {
    return `🔧`
  }
  if(status === StepStatus.Error) {
    return `❌`
  }
}

export default function Home() {
  const [tokenInput,setToken] = useState('')
  const jwtInfo = useMemo(()=> {
    try {
     const jwtInfo = jwtDecode(tokenInput)
      return jwtInfo
    }catch (e) {return null}
  },[tokenInput])
  const [steps,setSteps] = useState<Step[]>([])
  const [inputActive, setInputActive] = useState(true)

  const [allMember,setAllMember] = useState<any[]>([])
  const [libDictionary, setLibDictionary] = useState<any>()
  const [allLibs, setAllLibs] = useState<any[]>([])
  const [dataLoaded,setDataLoaded] = useState(false)
  const onSubmit = async ()=> {
    setDataLoaded(false)
    const familyStep = new Step()
    const memberStep = new Step()
    const libsStep = new Step()
    const steps = [familyStep,memberStep,libsStep]
    setSteps(steps)
    familyStep.trigger('正在获取家庭信息，请稍后')
    const familyInfo = await fetchFamilyInfo(tokenInput)
    if (!familyInfo) {
      familyStep.failed("获取家庭信息失败")
      setSteps([...steps])
      return
    }
    const familyName = familyInfo.data.familyGroup.name
    const memberIds =familyInfo.data.familyGroup.members.map((member:any)=>member.steamid.toString())
    const memberFamilyInfos = _.keyBy(familyInfo.data.familyGroup?.members, 'steamid')
    familyStep.success(`成功获取家庭信息，你好，${familyName} 的成员，更多数据正在赶来的路上`)
    libsStep.trigger('正在获取共享库存信息')
    memberStep.trigger('正在获取家庭成员信息')
    setSteps([...steps])
    const [libOverviewInfos,memberInfos] = await Promise.all([
      fetchFamilySharedLibs(tokenInput, familyInfo.data.familyGroupid),
      fetchFamilyMembers(tokenInput, memberIds)
    ])

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
    const members = memberInfos.data.accounts.map((account:any)=> {
      const id = account.publicData.steamid
      const avatar_hash = shaDigestAvatarBase64ToStrAvatarHash(account.publicData.shaDigestAvatar.toString())
      return {
        ...account.publicData,
        avatar_hash,
        ...memberFamilyInfos[id]
      }
    })
    setAllMember(members)

    const libs = libOverviewInfos.data.apps
      .filter( (app:any) => app.excludeReason == undefined || app.excludeReason == 0)

    const libIds:string[][] = _.chunk(libs.map((it:any)=>it.appid.toString()), 30)
    const itemsSteps = libIds.map((item,index)=> new Step())
    setSteps([...steps,...itemsSteps])
    const res = await Promise.all(libIds.map(async (idChunk,index) => {
      itemsSteps[index].trigger(`正在获取分块【${index * 30 + 1}-${index * 30 + idChunk.length}】的库存信息`)
      setSteps([...steps,...itemsSteps])
      const res = await fetchFamilyLibItems(idChunk)
      if (!res || res.data.storeItems.length == 0) {
        itemsSteps[index].failed(`分块【${index * 30 + 1}-${index * 30 + idChunk.length}】的库存详情信息获取失败`)
      }else {
        itemsSteps[index].success(`成功获取分块【${index * 30 + 1}-${index * 30 + idChunk.length}】的库存详情信息`)
      }
      setSteps([...steps,...itemsSteps])
      return res
    }))
    const items = res
      .filter((it,index) => {
        return !(!it || it.data.storeItems.length == 0);
      })
    .map(resp=>resp.data.storeItems).flatMap(it=>it)
    const libDictionary = _.keyBy(items, 'id')
    const allLib = libs.map((lib:any)=> ({
      ...lib,
        detail: libDictionary[lib.appid]
    }))
    setAllLibs(allLib)
    setLibDictionary(libDictionary)
    const finalStep = new Step()
    finalStep.success("已获取库存详情信息")
    setSteps([...steps, ...itemsSteps, finalStep])
    setDataLoaded(true)
  }
  const onSubmitWrapper = ()=> {
    setInputActive(false)
    onSubmit()
    setInputActive(true)
  }
  // const
  return (
    <main className="flex min-h-screen flex-col items-center max-w-[1024px] ml-auto mr-auto">
      <Header/>
      <div className={"flex flex-col w-full min-w-full md:min-w-96 px-4 md:px-20"}>
        <div className={"text-lg font-semibold py-2"}>AccessToken</div>
        <div className={'flex flex-col md:flex-row'}>
          <div
            className={"max-w-96 space-y-2"}
          >
            <Textarea
              placeholder="Type your access_token here."
              className={'min-h-80 min-w-full md:min-w-96'}
              value={tokenInput}
              onChange={(e) => {
                setToken(e.target.value)
              }}
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
            <div>
              {
                steps
                  .filter(step=>step.isTriggered())
                  .map((step, index) =>
                  <div key={index} className={"space-x-2 text-xs font-light"}>
                    <span
                    className={cn(

                      // step.stepStatus === StepStatus.Processing && 'animate-spin'
                    )}
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
        dataLoaded && <DataGraph libs={allLibs} players={allMember}/>
      }
    </main>
  );
}
