'use client'

import QRCode from "react-qr-code"
import {TablerLoader2} from "@/components/Loader";
import {useQRAuth} from "@/hooks/auth/useQRAuth";
import {PollStatus} from "@/hooks/auth/interface";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {useEffect} from "react";



export default function QR() {
  const { refreshQR, status, pollTime, isRefetching, challengeURL } = useQRAuth()
  return (
    <div>
      <div>
        <div className={"w-44 h-44  shadow-lg bg-white  rounded-lg relative overflow-hidden"}>
          <QRCode
            size={256}
            className={"absolute max-w-40 max-h-40 m-2 "}
            value={challengeURL}
            viewBox={`0 0 256 256`}
          />
          {
            (status !== PollStatus.notScan) &&
              <div
                className={"backdrop-blur bg-white/60 z-10 absolute w-full h-full flex justify-center items-center"}
                onClick={refreshQR}
              >
                {
                  status === PollStatus.accept && <div>accept ✅</div>
                }
                {
                  status === PollStatus.interactButNotAccept && <TablerLoader2 className={"animate-spin w-8 h-8"}/>
                }
                {
                  status === PollStatus.outdated && <div>outdated ❌</div>
                }
              </div>
          }
        </div>
        < div> status: {status}</div>
        <div>pollTime: {pollTime}</div>
      </div>
    </div>
  )
}
