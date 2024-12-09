
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {useAuthViaQRQuery} from "@/hooks/auth/query/useAuthViaQRQuery";
import useQRAuthPolling from "@/hooks/auth/query/useQRAuthPolling";
import {AuthType, PollStatus, SteamToken} from "@/hooks/auth/interface";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {jwtDecode} from "jwt-decode";
import {useGetUserInfoMutation} from "@/hooks/auth/query/useGetFinalTokenMutation";
import {getRandomId} from "@/lib/utils";


export function useQRAuth() {
  const queryClient = useQueryClient()

  const {data: authBasicInfo, isSuccess, isRefetching, isLoading: isQRLoading } = useAuthViaQRQuery()
  const {status, pollTime, data, isLoading, error, refresh, challengeURL, setChallengeURL, clientId,setClientId}
    = useQRAuthPolling(isSuccess && !isRefetching, authBasicInfo?.qrInfo?.requestId)
  const [ok, setOk] = useState(false)



  useEffect(() => {
    if(authBasicInfo?.qrInfo?.clientId) {
      setClientId(authBasicInfo.qrInfo.clientId)
    }
    if(authBasicInfo?.qrInfo?.challengeUrl) {
      setChallengeURL(authBasicInfo.qrInfo.challengeUrl)
    }
  }, [authBasicInfo]);

  const { mutateAsync } = useGetUserInfoMutation()

  const tokenStore = useTokenStore()
  useEffect(() => {
    if (status === PollStatus.accept) {
      setOk(true)
      const token = {
        steamId: jwtDecode(data?.accessToken!).sub!,
        accessToken: data?.accessToken!,
        refreshToken: data?.refreshToken!,
        username: "unknown",
        id: getRandomId(),
        // accountName: data?.accountName ??
        avatarUrl: "https://www.loliapi.com/acg/pp",
        addedAt: Date.now(),
        authType: AuthType.QR,
        other: {}
      }
      mutateAsync(token).then(res=>{
        tokenStore.addAndSetCurrentToken(res)
      })
    }
  }, [status, setOk, data, authBasicInfo?.sessionInfo?.sessionId]);


  const refreshQR = () => {
    if(status === PollStatus.outdated) {
      queryClient.invalidateQueries({queryKey: ['getQR']})
      // queryClient.invalidateQueries({queryKey: ['getQR']})
      refresh()
    }
  }
  const finalStatus = isQRLoading ? PollStatus.loadQR : status
  return {
    refreshQR, status: finalStatus, pollTime, isRefetching, challengeURL, ok
  }
}
