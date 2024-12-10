import {useQuery} from "@tanstack/react-query";
import {
  InferRespJsonType
} from "@repo/steam-proto";
import {AuthBasicInfo} from "@/hooks/auth/interface";
import {randomBytes} from "crypto";
import {f} from '@/lib/omfetch'

export const useAuthViaQRQuery = () => {
  return useQuery({
    // 在第一次获取 QR 的时候，携带上 sessionId，akmc 等字段
    // beginAuthViaQR
    queryKey: ['getQR'],
    queryFn: async () => {
      const qrData = await f.get<InferRespJsonType<'Authentication', 'BeginAuthSessionViaQR'>>(`/api/steam/auth/qr`)
      return {
        qrInfo: {
          clientId: qrData?.clientId,
          requestId: qrData?.requestId,
          challengeUrl: qrData?.challengeUrl,
        },
        sessionInfo: {
          sessionId: randomBytes(12).toString('hex'),
        },
      } as unknown as AuthBasicInfo
    }
  })
}
