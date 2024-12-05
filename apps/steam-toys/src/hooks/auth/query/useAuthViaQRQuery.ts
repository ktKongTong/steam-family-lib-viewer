import {useQuery} from "@tanstack/react-query";
import {CAuthentication_BeginAuthSessionViaQR_Response, ProxiedAPIResponse} from "@repo/steam-proto";
import {AuthBasicInfo} from "@/hooks/auth/interface";
import {randomBytes} from "crypto";

export const useAuthViaQRQuery = () => {
  return useQuery({
    // 在第一次获取 QR 的时候，携带上 sessionId，akmc 等字段
    // beginAuthViaQR
    queryKey: ['getQR'],
    queryFn: async () => {
      const qrData = await fetch(`/api/steam/auth/qr`)
        .then(res=>res.json() as Promise<ProxiedAPIResponse<CAuthentication_BeginAuthSessionViaQR_Response>>)
      // const basicInfo  = await fetch(`/api/steam/auth/basic`)
      //   .then(res=>res.json())
      return {
        qrInfo: {
          clientId: qrData.data?.clientId,
          requestId: qrData.data?.requestId,
          challengeUrl: qrData.data?.challengeUrl,
        },
        sessionInfo: {
          sessionId: randomBytes(12).toString('hex'),
          // ak_bmsc: randomBytes(12).toString('hex'),
        },
      } as unknown as AuthBasicInfo
    }
  })
}
