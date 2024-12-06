import {useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {PollStatus} from "@/hooks/auth/interface";
import { SteamStdResponseType } from "@repo/steam-proto"
import { f } from '@/lib/omfetch'

export default function useQRAuthPolling(
  enabled: boolean,
  requestId?: string,
) {
  const [challengeURL, setChallengeURL] = useState("")
  const [clientId, setClientId] = useState<bigint| undefined>()
  const clientIdRef  = useRef<bigint| undefined>()
  const [pollTime, setPollTime] = useState(0)
  const [status, setStatus] = useState(PollStatus.notScan)
  const {data, isLoading, error } = useQuery({
    queryKey: ['pollForAuth', requestId],
    queryFn: async () => {
      const clientId = clientIdRef.current
      if(!clientId) {
        return
      }
      setPollTime((it)=> it + 1)
      const res = await f.get<SteamStdResponseType<'Authentication', 'PollAuthSessionStatus'>>(`/api/steam/auth/poll?client_id=${clientId}&request_id=${requestId}`)
      return res.data
    },
    refetchInterval: (query) => {
      if(pollTime >= 20) {
        return undefined
      }
      const data = query.state.data
      if(data?.refreshToken) {
        return undefined
      }
      return 2000
    },
    enabled: enabled && (status === PollStatus.notScan || status === PollStatus.interactButNotAccept)
  })

  useEffect(()=> {
    if(pollTime >= 20) {
      setStatus(PollStatus.outdated)
    } else  {
      if(data?.hadRemoteInteraction && !data.refreshToken ) {
        setStatus(PollStatus.interactButNotAccept)
      }else if(data?.refreshToken) {
        // do next stage
        setStatus(PollStatus.accept)
      }
    }
    if(!data?.refreshToken && data?.newClientId || data?.newChallengeUrl) {
      if(data?.newChallengeUrl && challengeURL != data?.newChallengeUrl) {
        setChallengeURL(data.newChallengeUrl)
      }
      if(data?.newClientId && clientId != data?.newClientId) {
        clientIdRef.current = data?.newClientId
        setClientId(data?.newClientId)
      }
    }
  }, [pollTime, data, challengeURL, clientId])

  const setC = (id: bigint)=> {
    clientIdRef.current = id
    setClientId(id)
  }
  const refresh = () => {
    setStatus(PollStatus.notScan)
    setPollTime(0)
  }

  return {
    status, pollTime, data, isLoading, error, clientId, challengeURL, refresh, setClientId:setC, setChallengeURL
  }
}


export const useAuthPollQuery = (clientId: bigint, requestId: string) => {
  return useQuery({
    // 在第一次获取 QR 的时候，携带上 sessionId，akmc 等字段
    // beginAuthViaQR
    queryKey: ['pollForAuth',clientId, requestId],
    queryFn: async () => {
      const res = await f.get<SteamStdResponseType<'Authentication', 'PollAuthSessionStatus'>>(`/api/steam/auth/poll?client_id=${clientId}&request_id=${requestId}`)
      return res
    },
    refetchInterval: (data) => !data ? 5000 : undefined
  })
}