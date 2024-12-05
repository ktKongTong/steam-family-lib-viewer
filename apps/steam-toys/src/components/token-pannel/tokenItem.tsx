import {SteamToken} from "@/hooks/auth/interface";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import * as React from "react";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {Check} from "lucide-react";
import {cn} from "@/lib/utils";

export function TokenItem({token, selected, className }:{token: SteamToken, selected: boolean, className?: string}) {
  const curToken = useTokenStore(state => state.currentToken);
  return (
    <div className={cn(
      "p-2 flex items-center justify-between hover:bg-zinc-200/70 rounded-md",
      selected && "bg-zinc-200/70",
      className
    )}>
      <div className={"flex items-center space-x-2 pr-4"}>
        <Avatar>
          <AvatarImage src={token.avatarUrl}/>
          <AvatarFallback>{token.username}</AvatarFallback>
        </Avatar>
        <div>
          <div className={"text-sm"}>{token.username}</div>
          <div className={"text-xs italic text-zinc-400"}>{dayjs(token.addedAt).format('YY-MM-DD')}</div>
        </div>
      </div>

      <div>
        {
          curToken == token &&
          <div className={"rounded-full flex justify-center items-center bg-green-400 w-5 h-5"}>
              <Check className={"w-3 h-3 text-white"}/>
          </div>
        }
      </div>
    </div>
  )
}