import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {CAuthentication_PollAuthSessionStatus_Response} from "@/proto/gen/web-ui/service_authentication_pb";
import {PollStatus} from "@/hooks/auth/interface";


export default function useQRAuthPolling(
  enabled: boolean,
  qrInfo?: {
    clientId: bigint,
    requestId: string,
    challengeUrl: string,
  }
) {
  const [challengeURL, setChallengeURL] = useState(qrInfo?.challengeUrl ?? "")
  const [clientId, setClientId] = useState(qrInfo?.clientId)
  const [pollTime, setPollTime] = useState(0)
  const [status, setStatus] = useState(PollStatus.notScan)
  const {data, isLoading, error } = useQuery({
    queryKey: ['pollForAuth',clientId, qrInfo?.requestId],
    queryFn: async () => {
      setPollTime((it)=> it + 1)
      // let params:{clientId: bigint, requestId: string} = {} as any
      const res = await fetch(`/api/steam/auth/poll?client_id=${clientId}&request_id=${qrInfo?.requestId}`)
        .then(res=>res.json() as Promise<ProxiedAPIResponse<CAuthentication_PollAuthSessionStatus_Response>>)
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
    enabled: enabled
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
        setClientId(data?.newClientId)
      }
    }
  }, [pollTime, data, challengeURL, clientId, setChallengeURL, setClientId])

  const refresh = () => {
    setStatus(PollStatus.notScan)
    setPollTime(0)
  }

  return {
    status, pollTime, data, isLoading, error, clientId, challengeURL, refresh, setClientId, setChallengeURL
  }
}


export const useAuthPollQuery = (clientId: bigint, requestId: string) => {
  return useQuery({
    // 在第一次获取 QR 的时候，携带上 sessionId，akmc 等字段
    // beginAuthViaQR
    queryKey: ['pollForAuth',clientId, requestId],
    queryFn: async () => {
      // let params:{clientId: bigint, requestId: string} = {} as any
      const res = await fetch(`/api/steam/auth/poll?client_id=${clientId}&request_id=${requestId}`)
        .then(res=>res.json() as Promise<ProxiedAPIResponse<CAuthentication_PollAuthSessionStatus_Response>>)
      // 当刷新 qr 的时候，需要？
      return res
    },
    refetchInterval: (data) => !data ? 5000 : undefined
  })
}