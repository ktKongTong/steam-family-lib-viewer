'use client'
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import DataGraph from "@/app/_family-graph/datagraph";
import {useToast} from "@/components/ui/use-toast";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {Steps} from "@/app/_steps/steps";
import {useSteamFamilyLibInfo} from "@/hooks/data/useSteamFamilyLibInfo";




export default function Home() {

  const {toast} = useToast()
  const token = useTokenStore(state => state.currentToken)
  const {
    dataLoaded,
    canDisplay,
    fetch,
    steps,
    steamFamilyInfo,
    sharedPlaytime,
    allLibs,
    allMembers,
    loading,
  } = useSteamFamilyLibInfo(token?.accessToken ?? "", token?.steamId ?? "")

  const [ok, setOK] = useState(!!token)
  useEffect(() => setOK(token != null), [token])

  const onSubmit = () => {
    if (token) {
      setOK(false)
      fetch()
      .finally(() => setOK(true))
    } else {
      toast({
        title: "获取失败",
        description: "请先选中一个Token"
      })
    }
  }

  return (

    <section className={'w-full min-w-full'}>
      <div className={"flex flex-col w-full min-w-full md:min-w-96 px-4 md:px-20"}>
          <Steps steps={steps}/>
          <Button variant={'ghost'} className={"ml-auto mr-2 w-fit my-4"}
                  disabled={!ok && loading}
                  onClick={onSubmit}
          >
            开始
          </Button>
      </div>
        {
          canDisplay &&
            <DataGraph
                libs={allLibs}
                players={allMembers}
                libsPlaytime={sharedPlaytime}
                family={steamFamilyInfo!}
                allDataLoaded={dataLoaded}
            />
        }
    </section>
  );
}