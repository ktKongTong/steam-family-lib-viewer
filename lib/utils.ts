import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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