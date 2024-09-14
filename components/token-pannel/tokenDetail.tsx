// 刷新Token/信息
import {SteamToken} from "@/hooks/auth/interface";
import * as React from "react";

export function TokenDetail(
  {
    token
  }:{
    token: SteamToken
  }) {
  return (
    <div>
      {token.steamId}
      {token.username}
    </div>
  )
}