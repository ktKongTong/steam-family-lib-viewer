import {createContext, useContext} from "react";

export type AvailableLocales = "en-US" | "zh-CN"

const localeCtx = createContext<AvailableLocales>("en-US")

export const LocaleProvider = localeCtx.Provider

export const useLocale = () => {
  const locale = useContext(localeCtx)

  return locale
}