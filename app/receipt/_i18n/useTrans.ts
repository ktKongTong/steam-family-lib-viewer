
import zh from './zh.i18n'
import en from './en.i18n'
import {i18nRecord} from "./interface";
import logger from "@/lib/logger";

const localMap: Record<string, i18nRecord> = {
  'zh-CN': zh,
  'en-US': en,
}

interface TransOpts {
  locale?: string
  prefix?: string
}

export const useTrans = (ops?: TransOpts) => {
  const locale = ops?.locale
  let l = en
  if(locale && localMap[locale]) {
    l = localMap[locale]
  }
  if(ops?.prefix) {
    const keys = ops?.prefix.split('.')
    let obj: any = l
    for (const key of keys) {
      // obj can be a string, an object
      if (obj[key]) {
        obj = obj[key]
      }
    }
    if( typeof obj === 'string') {
      logger.warn(`[useTrans] prefix ${ops?.prefix} not found in locale ${locale}`)
    }else {
      l = obj
    }
  }


  return {
    t: (id: string, ...params: any) : string => {
      const keys = id.split('.')
      let obj: any = l
      for (const key of keys) {
        if (obj[key]) {
          obj = obj[key]
        } else return id
      }
      if(typeof obj === 'function') {
        return obj(...params)
      }else if(typeof obj === 'string') {
        return obj
      }
      return obj ?? id
    },
    locale: locale || 'en-US'
  }
}