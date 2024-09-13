'use client'
import _ from 'lodash'
import React, {useEffect, useMemo, useState} from 'react';
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
import {SteamAppPlaytime} from "@/interface/steamPlaytime";
import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {TokenPanel} from "@/components/tokenPanel";
import {SharedLibraryStep, useSteamFamilyLibInfo} from "@/hooks/data/useSteamFamilyLibInfo";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useRandomBackground} from "@/hooks/data/useRandomBackground";

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




export type Player = FamilyGroupMember & CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicData & {
  avatar_hash: string
}
export type App = CFamilyGroups_GetSharedLibraryApps_Response_SharedApp
  & {  detail: StoreItem }
  & { owners: Player[] }
  & { playtime?: any }


export default function Home() {

  const { toast } = useToast()
  const { background } = useRandomBackground()
  const token = useTokenStore(state => state.currentToken)
  const {
    dataLoaded,
    canDisplay,
    fetch,
    steps,
    steamFamilyInfo,
    sharedPlaytime,
    allLibs,
    allMembers
  } = useSteamFamilyLibInfo(token?.accessToken??"",token?.steamId ?? "")




  const [ok, setOK] = useState(!!token)
  useEffect(() => setOK(!token), [token])
  const onSubmit = ()=> {
    if(token) {
      setOK(false)
      fetch().then(()=> {setOK(true)})
    }else {
      toast({
        title: "获取失败",
        description: "请先选中一个Token"
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center max-w-[1024px] ml-auto mr-auto">
      <Header/>
      <div className={"flex flex-col w-full min-w-full md:min-w-96 px-4 md:px-20"}>
        <TokenPanel/>
        {
          token &&
          <div>
              uname: {token.username}
              curToken: {token.accessToken.slice(0,30)}
          </div>
        }
        <Steps steps={steps}/>
        <Button variant={'ghost'} className={"ml-auto mr-2 w-fit my-4"}
                disabled={!ok}
                onClick={onSubmit}
        >Let's Start</Button>
      </div>
      {
        canDisplay &&
          <DataGraph libs={allLibs} players={allMembers} libsPlaytime={sharedPlaytime!} family={steamFamilyInfo!}
                     bg={background}/>
      }
    </main>
  );
}



function Steps(
  {
    steps
  }:{
    steps: [Step,[Step,Step,SharedLibraryStep],Step]
  }
) {
  // console.log("rerenderSteps", JSON.parse(JSON.stringify(steps)))

  return (
    <div className={'flex md:flex-row w-full justify-evenly items-center'}>
          <StepItem step={steps[0]}/>
      <div className={"flex flex-col gap-2"}>
        <RightStepItem step={steps[1][0]}/>
        <RightStepItem step={steps[1][1]}/>
        {
          steps[1][2].steps.length == 0 ? (
            <RightStepItem step={steps[1][2]}/>
          ):(
            <Popover>
              <PopoverTrigger><RightStepItem step={steps[1][2]}/></PopoverTrigger>
              <PopoverContent><SubSteps steps={steps[1][2].steps}/></PopoverContent>
            </Popover>
          )
        }
      </div>

      <StepItem step={steps[2]}/>
    </div>
  )
}

function SubSteps({
  steps
}:{
  steps: Step[]
}) {
  // retry 重新设置store
  return (
    <div className={"p-2"}>
      <ul>
        {steps.map(step => (
          <li key={step.title}>
            <div
              className={"text-xs font-light rounded-full bg-gray-300"}>
              <span className={cn("")}>{statusToEmoji(step.stepStatus)}</span>
              <div className={""}>
                {step.title}
              </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}
function RightStepItem(
  {
    step
  }: {
    step: Step
  }
) {
  return (
    <div className={"text-xs font-light relative w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"}>
      <span className={cn("")}>{statusToEmoji(step.stepStatus)}</span>
      <div className={"absolute left-full break-keep pl-1"}>
        {step.title}
      </div>
    </div>
  )
}
function StepItem(
  {
    step
  }: {
    step: Step
  }
) {
  return (
    <div className={"text-xs font-light relative w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"}>
      <span className={cn("")}>{statusToEmoji(step.stepStatus)}</span>
      <div className={"absolute top-full break-keep -translate-x-1/2 left-4"}>
            {step.title}
          </div>
        </div>
  )
}