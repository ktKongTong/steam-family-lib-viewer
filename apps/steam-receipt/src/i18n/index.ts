import zh from "./zh.i18n";
import en from "./en.i18n";
import jp from "./jp.i18n";
import {TransSchema} from "@ktfun/sts-i18n-react";

export const localeMap = {
  'zh-CN': zh,
  'en-US': en,
  'ja-JP': jp
}

export const availableLocales = [
  { label: 'English', value: 'en-US' },
  { label: '简体中文', value: 'zh-CN' },
  { label: '日本語', value: 'ja-JP' },
] as const

export type EnTransSchema = TransSchema<typeof en>
export type AvailableLocales = keyof typeof localeMap

export type BaseTrans = typeof en