import {Textarea} from "@/components/ui/textarea";
import React, {useMemo, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {Button} from "@/components/ui/button";
import {useGetUserInfoMutation} from "@/hooks/auth/query/useGetFinalTokenMutation";
import {AuthType} from "@/hooks/auth/interface";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import useStore from "@/hooks/useStore";
import {Loader, Loader2} from "lucide-react";
import GetToken from "@/components/token-pannel/GetToken";

export default function NewTokenForm (

) {

  const [tokenInput,setToken] = useState('')
  const [loading,setLoading] = useState(false)
  const tokenStore = useTokenStore()
  const jwtInfo = useMemo(()=> {
    try {
      return jwtDecode(tokenInput)
    }catch (e) {return null}
  },[tokenInput])
  const {
    mutateAsync,
    verified,
    token,
    err
  } = useGetUserInfoMutation()
  const verifyToken = ()=> {
    // 1. setLoading
    setLoading(true)
    // 2. mutate Content
    mutateAsync({
      authType: AuthType.InputToken,
      addedAt: Date.now(),
      steamId: jwtInfo?.sub,
      accessToken: tokenInput,
      refreshToken: ""
    }).then(res => {
      tokenStore.addAndSetCurrentToken?.(res)
    })
      .finally(() => {setLoading(false)})
  }
  return (

    <div
      className={"max-w-96 space-y-2"}
    >
      <div className={'flex items-center space-x-2'}>
        <div className={"text-lg font-semibold py-2"}>AccessToken</div>
        <GetToken/>
      </div>
      <div className={'min-h-80 min-w-full md:min-w-96 relative flex items-center justify-center'}>
        <Textarea
          placeholder="Type your access_token here."
          className={'min-h-80 min-w-full md:min-w-96 absolute'}
          value={tokenInput}
          onChange={(e) => {
            setToken(e.target.value)
          }}
          disabled={loading}
        />
        {loading && <Loader2 className={"animate-spin"}/>}
      </div>
      {
        tokenInput.length > 0 && !jwtInfo &&
          <div className={"text-xs text-red-500 font-light py-0.5"}>
              <span>无法提取steamId，似乎不是一个正确的 token</span>
          </div>
      }
      <Button onClick={verifyToken}>验证并添加</Button>
    </div>
  )
}