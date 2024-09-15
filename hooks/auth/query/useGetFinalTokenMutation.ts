import {useId, useState} from "react";
import {AuthType, SteamToken} from "@/hooks/auth/interface";
import {useMutation} from "@tanstack/react-query";
import {shaDigestAvatarBase64ToStrAvatarHash} from "@/lib/steam_utils";
import {randomBytes} from "crypto";
import {getRandomId} from "@/lib/utils";

interface FinalTokenParam {
  nonce: string,
  sessionId: string,
  clientId: bigint,
  ak_bmsc: string
}

export const useGetUserInfoMutation = () => {
  const [verified, setVerified] = useState<boolean>(false)
  const [token, setToken] = useState<SteamToken| null>(null)
  const [err, setErr] = useState<Error | null>(null)
  const { mutateAsync } = useMutation({
    mutationFn: async (token: Partial<SteamToken>) => {
      const res = await fetch(`/api/steam/player/${token.steamId}?access_token=${token.accessToken}`)
        .then(res => res.json())
      const data = res.data.accounts[0].publicData
      const hash = shaDigestAvatarBase64ToStrAvatarHash(data.shaDigestAvatar)
      return {
        ...token,
        username: data.personaName,
        avatarUrl: `https://avatars.akamai.steamstatic.com/${hash}_full.jpg`,
        accountName: res.data.accounts[0].privateData!.accountName!,
        other: {

        }
      } as SteamToken
    },
    onSuccess: res => {
      setVerified(true)
      setToken(res)
    },
    onError: err => {
      setVerified(false)
    }
  })

  return {
    mutateAsync,
    verified,
    token,
    err
  }

}


export const useGetFinalTokenMutation = () => {
  const [token, setToken] = useState<SteamToken| null>(null)
  const {mutateAsync: getUserInfo} = useMutation({
      mutationFn: async (token:SteamToken) => {
        const res = await fetch(`/api/steam/player/${token.steamId}?access_token=${token.accessToken}`)
        // const token = await fetch(`/api/steam/auth/getToken?nonce=${nonce}&sessionId=${sessionId}&ak_bmsc=${ak_bmsc}`)
          .then(res => res.json())
        const data = res.data.accounts[0].publicData
        const hash = shaDigestAvatarBase64ToStrAvatarHash(data.shaDigestAvatar)
        return {
          ...token,
          username: data.personaName,
          avatarUrl: `https://avatars.akamai.steamstatic.com/${hash}_full.jpg`
        } as SteamToken
      }
    }
  )
  const {mutate } =  useMutation({
    mutationFn: async ({nonce, sessionId, ak_bmsc, clientId}: FinalTokenParam) => {
      const token = await fetch(`/api/steam/auth/getToken?nonce=${nonce}&sessionId=${sessionId}&ak_bmsc=${ak_bmsc}`)
        .then(res=>res.json())
      return {
        token: token,
        refreshToken: nonce,
        ak_bmsc, clientId,
        sessionId: sessionId,
      }
    },
    onSuccess: async (res)=>{
      // const tokenStore = useTokenStore()
      const token = {
        id: getRandomId(),
        steamId: res.token.steamId,
        accessToken: res.token.token,
        refreshToken: res.refreshToken,
        username: "unknown",
        avatarUrl: "https://www.loliapi.com/acg/pp",
        addedAt: Date.now(),
        accountName: '',
        valid: true,
        authType: AuthType.QR,
        other: {
          ak_bmsc: res.ak_bmsc,
          clientId: res.clientId,
          sessionId: res.sessionId,
        }
      } as SteamToken
      getUserInfo(token).then(res=>{setToken(res)})

    }
  })
  return {token, mutate}
}