import {useState} from "react";
import {SteamToken} from "@/hooks/auth/interface";
import {useMutation} from "@tanstack/react-query";

interface FinalTokenParam {
  nonce: string,
  sessionId: string,
  ak_bmsc: string
}

export const useGetFinalTokenMutation = () => {
  const [token, setToken] = useState<SteamToken| null>(null)

  const {mutate } =  useMutation({
    mutationFn: async ({nonce, sessionId, ak_bmsc}: FinalTokenParam) => {
      const token = await fetch(`/api/steam/auth/getToken?nonce=${nonce}&sessionId=${sessionId}&ak_bmsc=${ak_bmsc}`)
        .then(res=>res.json())
      return token
    },
    onSuccess: async (res)=>{
      // const tokenStore = useTokenStore()
      setToken({
        steamId: res.steamId,
        accessToken: res.token,
      })
    }
  })
  return {token, mutate}
}