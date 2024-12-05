import React, {useEffect, useState} from "react";
import {useCopyToClipboard} from "react-use";
import {Check, Copy} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {cn, formatDurationTime, formatRelativeTime} from "@/lib/utils";
import {useSteamToken} from "@/hooks/useSteamToken";
import dayjs from "dayjs";

export function RealtimeShow(
{
  time
}:{
  time: number
}
) {
  const getDiff = () => dayjs(dayjs(time)).diff() / 1000
  const [diffDuration, setDiffDuration] = useState(getDiff())
  useEffect(()=> {
    if(Math.abs(diffDuration) <= 3600){
      const interval = setInterval(()=>{
        setDiffDuration(getDiff())
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [diffDuration])
  // formatDurationTime(time)
  // const issueRelativeAt = formatRelativeTime(issueAt * 1000)
  // const expRelativeAt = formatRelativeTime(expAt * 1000)
  return <span>{formatDurationTime(diffDuration)}</span>
}

export function Token(
{
  token
}:{
  token: string
}
) {

  // 是否有效，过期时间
  // 刷新 AccessToken

  const {validToken,
      isExpired,
      issueAt,
      expAt,
      ip,
      auds,
      tokenType} = useSteamToken(token)
  const [copied, setCopied] = useState(false)
  const [, copy] = useCopyToClipboard()
  const {toast} = useToast()
  const onCopy = () => {
    setCopied(true)
    copy(token)
    toast({
      title: "已复制 Token",
    })
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <div>
      <div className={"flex items-center px-2 justify-start m-1 gap-1 flex-wrap"}>
        <div className={"border rounded-full px-2 bg-zinc-200 text-xs text-zinc-600"}>签发于<RealtimeShow time={issueAt * 1000}/></div>
        <div className={cn("border rounded-full px-2 bg-zinc-200 text-xs text-zinc-600", isExpired && 'bg-red-300 text-white')}>{isExpired ? '过期于' : '剩余有效时间'} <RealtimeShow time={expAt * 1000}/></div>
      </div>

      {/*<div className={"text-xs text-gray-400"}>IP：{ip}</div>*/}
      <div className={"p-3 relative border rounded-lg "}>
        <p className={"break-all line-clamp-4 text-ellipsis text-sm text-gray-400"}>{token}</p>
        <div className={"absolute right-2 top-2"}>
          <button className={'border bg-zinc-50 rounded-lg w-6 h-6 flex items-center justify-center'} onClick={onCopy}
                  disabled={copied}>
            {
              !copied ? <Copy className={"w-3 h-3"}/> : <Check className={"w-3 h-3"}/>
            }
          </button>
        </div>
      </div>
    </div>

  )
}