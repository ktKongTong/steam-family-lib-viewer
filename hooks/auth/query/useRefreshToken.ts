import {useMutation} from "@tanstack/react-query";
import {randomBytes} from "crypto";

export const useRefreshToken = (token: string) => {

  const sessionId = randomBytes(12).toString('hex')

  const {mutateAsync: refreshWebAccessToken} = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/steam/auth/finalize-login?nonce=${token}&sessionid=${sessionId}`)
        // const token = await fetch(`/api/steam/auth/getToken?nonce=${nonce}&sessionId=${sessionId}&ak_bmsc=${ak_bmsc}`)
        .then(res => res.json())
      return res.data.accessToken
    },
  })

  return {
    sessionId,
    webRefreshToken: refreshWebAccessToken
  }

}

export const useRefreshAccessToken = (token: string) => {
  const {webRefreshToken, sessionId} = useRefreshToken(token)
  // nonce
  // const sessionId = randomBytes(12).toString('hex')
  //
  // setToken
  const { mutateAsync: refreshWebAccessToken } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/steam/auth/getTokenByProxy?nonce=${token}&sessionid=${sessionId}`)
        .then(res => res.json())
      return res.data.accessToken
    },
  })

  return {
    refreshWebAccessToken: refreshWebAccessToken
  }

}