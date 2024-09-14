import {SteamToken} from "@/hooks/auth/interface";
import {useMemo} from "react";
import {TokenItem} from "@/components/token-pannel/tokenItem";
import * as React from "react";

export function TokenList(
  {
    onSelectToken,
    curToken,
    tokens,
    // currentToken
  }:{
    onSelectToken: (t : SteamToken | undefined) => void
    curToken: SteamToken | undefined | null
    tokens: Record<string, SteamToken>
  }
) {
  const token = useMemo(()=>Object.values(tokens), [tokens])
  return (
    <ul className={"w-40 space-y-2"}>
      {
        token.map(t => (
          <li key={t.steamId} onClick={()=>{onSelectToken(t)}} className={"cursor-pointer"}>
            {/*add active */}
            <TokenItem token={t} selected={curToken === t}/>
          </li>
        ))
      }
    </ul>
  )
}