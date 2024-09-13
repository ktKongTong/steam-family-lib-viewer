import {useQuery} from "@tanstack/react-query";
import {ProxiedAPIResponse} from "@/app/api/[[...routes]]/(api)/interface";
import {CAuthentication_BeginAuthSessionViaQR_Response} from "@/proto/gen/web-ui/service_authentication_pb";
import {AuthBasicInfo} from "@/hooks/auth/interface";

export const useAuthViaQRQuery = () => {
  return useQuery({
    // 在第一次获取 QR 的时候，携带上 sessionId，akmc 等字段
    // beginAuthViaQR
    queryKey: ['getQR'],
    queryFn: async () => {
      const qrData = await fetch(`/api/steam/auth/qr`)
        .then(res=>res.json() as Promise<ProxiedAPIResponse<CAuthentication_BeginAuthSessionViaQR_Response>>)
      const basicInfo  = await fetch(`/api/steam/auth/basic`)
        .then(res=>res.json())
      return {
        qrInfo: {
          clientId: qrData.data?.clientId,
          requestId: qrData.data?.requestId,
          challengeUrl: qrData.data?.challengeUrl,
        },
        sessionInfo: basicInfo,
      } as unknown as AuthBasicInfo
    }
  })
}
