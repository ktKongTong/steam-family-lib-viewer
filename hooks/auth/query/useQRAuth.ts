
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {useAuthViaQRQuery} from "@/hooks/auth/query/useAuthViaQRQuery";
import useQRAuthPolling from "@/hooks/auth/query/useQRAuthPolling";
import {PollStatus} from "@/hooks/auth/interface";
import {useGetFinalTokenMutation} from "@/hooks/auth/query/useGetFinalTokenMutation";


export function useQRAuth() {
  const {data: authBasicInfo, isSuccess, isRefetching} = useAuthViaQRQuery()
  const queryClient = useQueryClient()
  const [ok, setOk] = useState(false)
  const {status, pollTime, data, isLoading, error, refresh, challengeURL, setChallengeURL, setClientId} = useQRAuthPolling(isSuccess && !isRefetching , authBasicInfo?.qrInfo)
  useEffect(() => {
    if(authBasicInfo?.qrInfo?.clientId) {
      // console.log(`qr refresh update clientId, ${authBasicInfo.qrInfo.clientId}`)
      setClientId(authBasicInfo.qrInfo.clientId)
      // updateClientId(authBasicInfo?.qrInfo.clientId)
    }
    if(authBasicInfo?.qrInfo?.challengeUrl) {
      // console.log(`qr refresh update challengeUrl, ${authBasicInfo.qrInfo.challengeUrl}`)
      setChallengeURL(authBasicInfo.qrInfo.challengeUrl)
    }
  }, [authBasicInfo, setChallengeURL, setClientId]);

  const { mutate, token } = useGetFinalTokenMutation()

  useEffect(() => {
    if (status === PollStatus.accept) {
      setOk(true)
      mutate({
        nonce: data!.refreshToken!!,
        sessionId: authBasicInfo?.sessionInfo?.sessionId!!,
        ak_bmsc: authBasicInfo?.sessionInfo?.ak_bmsc!!,
      })
    }
  }, [status, setOk, mutate, data, authBasicInfo?.sessionInfo?.sessionId, authBasicInfo?.sessionInfo?.ak_bmsc]);


  const refreshQR = () => {
    if(status === PollStatus.outdated) {
      queryClient.invalidateQueries({queryKey: ['getQR']})
      refresh()
    }
  }

  return {
    refreshQR, status, pollTime, isRefetching, challengeURL, ok, token
  }
}
