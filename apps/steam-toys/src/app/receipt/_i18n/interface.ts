
type i18nFn = () => string

export interface i18nRecord {
  [key: string]: i18nRecord | string | i18nFn
}