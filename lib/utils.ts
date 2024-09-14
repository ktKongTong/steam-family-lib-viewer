import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {JwtPayload} from "jwt-decode";
import dayjs from "dayjs";
import {App} from "@/interface/steamPlaytime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cooldownDurationTostring = (duration:number)=> {
  if(duration == 0) return "暂无冷静期"
  if(duration < (24 * 3600)) {
    return "冷静期剩余" + (duration/3600).toFixed(0) + "小时"
  }
  return "冷静期剩余"+ (duration / (24 * 3600)).toFixed(0) + "天"
}

export const formatTime = (time: string|number|Date, template = 'YY-MM-DD') => {
  return dayjs(time).format(template)
}
export const formatRelativeTime = () => {
  return "dayjs(time).format(template)"
}
function validToken(token: JwtPayload | null) {
  if (!token || !token.exp) {

    return {
      res: false,
      reason: "无法提取出有效的 token 信息"
    }
  }
  const res = dayjs.unix(token.exp).isAfter(dayjs())
  return {
    res: res,
    reason: res ? 'success' : `token 已于${dayjs.unix(token.exp).format('YY-MM-DD HH:mm:ss')}失效`
  }
}


export const getAvatar = (hash:string) => `https://avatars.akamai.steamstatic.com/${hash}_full.jpg`
export const getGameAsset = (game:App, filename:string) => {
  const format = game.detail.assets?.assetUrlFormat
  const prefix = "https://cdn.akamai.steamstatic.com/"
  const url = format?.replace("${FILENAME}", filename)
  // console.log(prefix+url)
  return prefix + url
}
export const getGameTrailer = (game:App) => {
  try {
    const format = game.detail.trailers?.highlights?.[0]!.trailerUrlFormat!
    const prefix = "https://cdn.akamai.steamstatic.com/"
    //
    // https://cdn.akamai.steamstatic.com/steam/apps/256689996/microtrailer.webm
    const filename = game.detail.trailers?.highlights?.[0]!.microtrailer[0].filename!
    const url = format.replace("${FILENAME}", filename)
    return prefix + url
  }catch (e) {
    return null
  }

}
export const getGameHeader = (game:App) => {
  return getGameAsset(game,game.detail.assets?.header!)
}

export const getGameCapsule = (game:App) => {
  return getGameAsset(game,game.detail.assets?.libraryCapsule??'')
}