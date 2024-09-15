// 刷新Token/信息
import {SteamToken} from "@/hooks/auth/interface";
import * as React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import {Token} from "@/components/token-pannel/token";
import {Button} from "@/components/ui/button";
import {useSteamToken} from "@/hooks/useSteamToken";
import {useRefreshAccessToken} from "@/hooks/auth/query/useRefreshToken";
import {useState} from "react";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {cn} from "@/lib/utils";


export function TokenDetailHeader(
  {
    token,
    className
  }:{
    token: SteamToken,
    className?: string
  }
) {
  return (
    <div className={cn('flex justify-between items-center', className)}>
      <div>
        <div className={"flex items-center space-x-2 pr-4"}>
          <Avatar>
            <AvatarImage src={token.avatarUrl}/>
            <AvatarFallback>{token.username}</AvatarFallback>
          </Avatar>
          <div>
            <div className={"text-sm"}>{token.username}</div>
            <div className={"text-xs text-zinc-300"}>{token.accountName}</div>
          </div>
        </div>
      </div>
      <div className={"flex flex-col items-end"}>
        <div className={"text-xs italic text-zinc-400"}>{token.steamId}</div>
        <div
          className={"text-xs italic text-zinc-400"}>{dayjs(token.addedAt).format('YY-MM-DD')} by {token.authType}</div>
      </div>
    </div>
  )
}

export function TokenDetail(
  {
    token
  }: {
    token: SteamToken
  }) {

  const {isExpired: refreshTokenExpired} = useSteamToken(token.refreshToken ?? "")
  const {refreshWebAccessToken} = useRefreshAccessToken(token.refreshToken ?? "")
  // setTokenID to Invalid
  const onRenewRefreshToken = () => {
    // 成功时刷新当前token
  }
  const tokenStore = useTokenStore()
  const [refreshing, setRefreshing] = useState(false)

  const onRenewAccessToken = () => {
    setRefreshing(true)
    refreshWebAccessToken()
      .then(res => {
        let newToken: SteamToken = {
          ...token
        }
        newToken.accessToken = res
        tokenStore.updateToken(newToken)
      })
      .finally(() => setRefreshing(false))
  }

  const onRemoveToken = ()=> {
    tokenStore.removeTokenById(token.id)
  }

  return (
    <div className={"flex flex-col gap-2"}>
      <div>
        <div>accessToken</div>
        <Token token={token.accessToken} key={token.id}/>
      </div>
      {
        token.refreshToken &&
          <div className={"flex flex-col"}>
              <div className={"flex justify-between items-center"}>
                  <div>refreshToken</div>

                {
                  !refreshTokenExpired &&
                    <div className={"flex items-center space-x-2"}>
                        <Button variant={'ghost'} className={'py-1 px-2'} size={'sm'} onClick={()=>onRenewAccessToken()} disabled={refreshing}>刷新</Button>
                    {/*    */}
                    </div>
                }
              </div>
              <Token token={token.refreshToken ?? ""} key={token.id}/>
          </div>
      }
      <div className={'self-end'}>
        <Button variant={'destructive'} className={'py-1'} size={'sm'} disabled={refreshing} onClick={()=>onRemoveToken()}>删除</Button>
      </div>
    </div>
  )
}