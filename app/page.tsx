'use client'
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import DataGraph from "@/app/_family-graph/datagraph";
import Header from "@/app/header";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import {
  CFamilyGroups_GetSharedLibraryApps_Response_SharedApp,
  FamilyGroupMember
} from "@/proto/gen/web-ui/service_familygroups_pb";
import {
  CPlayer_GetPlayerLinkDetails_Response_PlayerLinkDetails_AccountPublicData
} from "@/proto/gen/web-ui/service_player_pb";
import {StoreItem} from "@/proto/gen/web-ui/common_pb";
import {useToast} from "@/components/ui/use-toast";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {useRandomBackground} from "@/hooks/useRandomBackground";
import {Steps} from "@/app/_steps/steps";
import {useSteamFamilyLibInfo} from "@/hooks/data/useSteamFamilyLibInfo";
import {TokenSelector} from "@/components/token-pannel/tokenSelector";

dayjs.extend(relativeTime)



export default function Home() {

  const {toast} = useToast()
  const {background} = useRandomBackground()
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
  } = useSteamFamilyLibInfo(token?.accessToken ?? "", token?.steamId ?? "")


  const [ok, setOK] = useState(!!token)
  useEffect(() => setOK(token != null), [token])

  const onSubmit = () => {
    if (token) {
      setOK(false)
      fetch()
      .then(() => {
        setOK(true)
      })
    } else {
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
        <Steps steps={steps}/>
        <Button variant={'ghost'} className={"ml-auto mr-2 w-fit my-4"}
                disabled={!ok}
                onClick={onSubmit}
        >
          开始
        </Button>
      </div>
      {
        canDisplay &&
          <DataGraph libs={allLibs} players={allMembers} libsPlaytime={sharedPlaytime!} family={steamFamilyInfo!}
                     bg={background} allDataLoaded={dataLoaded}/>
      }
    </main>
  );
}