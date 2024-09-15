import useStore from "@/hooks/useStore";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {useMemo} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {TokenItem} from "@/components/token-pannel/tokenItem";
import {TokenList} from "@/components/token-pannel/tokenList";
import {TokenManagerDrawerDialog} from "@/components/token-pannel/tokenManageDialog";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import {formatTime} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export function TokenSelector() {

  const currentToken = useStore(useTokenStore, state => state.currentToken)
  const tokensMap = useStore(useTokenStore, state => state.tokens)
  const tokenStore = useTokenStore()
  const tokens = useMemo(()=>Object.values(tokensMap ?? {}), [tokensMap])
  return (
    <Popover>
      <PopoverTrigger className={"flex"}>
        <div className={"rounded"}>
          {
            currentToken &&
                  <div className={"flex items-center space-x-2 "}>
                      <Avatar>
                          <AvatarImage src={currentToken.avatarUrl}/>
                          <AvatarFallback>{currentToken.username}</AvatarFallback>
                      </Avatar>
                      <div className={"hidden sm:block"}>
                          <div className={"text-sm"}>{currentToken.username}</div>
                      </div>
                  </div>
          }
          {
            !currentToken &&
              <div className="flex items-center space-x-2 ">
                  <Avatar>
                      <AvatarFallback>{"+"}</AvatarFallback>
                  </Avatar>
                  <div className={" text-sm  space-x-2 hidden sm:block"}>
                      添加Token
                  </div>
              </div>
          }
        </div>
      </PopoverTrigger>
      <PopoverContent className={"p-0 py-2 w-full"}>
        {/*token list Token */}
        <div className={"flex flex-col items-center"}>
          <ul className={"space-y-2"}>
            {
              tokens.map(t => (
                <li key={t.steamId} onClick={() => {tokenStore.setCurrentToken(t)}} className={"cursor-pointer"}>
                  <TokenItem token={t} selected={false} className={'w-full'}/>
                </li>
              ))
            }
          </ul>
            <TokenManagerDrawerDialog>
              <button className={"w-full p-2 text-sm text-primary"}>
                添加新Token
              </button>
            </TokenManagerDrawerDialog>
        </div>

      </PopoverContent>
    </Popover>

  )
}