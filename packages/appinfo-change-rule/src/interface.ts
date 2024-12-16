
// vdf changeset
// 此值表示目标状态，path 上的值一定存在。
// 如果原同路径的值类型不符合，应当提示。
// 如果原同路径的值不存在，则新建。
// path 不应该冲突，这应该由其他方式进行保证
export type Target = {
  path: string
} & ({
  value: string
  type: 'str'
} | {
  value: number
  type: 'int32'
})


export type SupportLanguage =
  'schinese'
  | 'tchinese'
  | 'english'

export type AppInfoChangeRule = {
  appid: number,
  name: string,
  modifiedName?: string,
  sortas?: string,
  localized?:Partial<Record<SupportLanguage, string>>,
  type: string,
}

// divide by publisher
// divide by series
// divide by platform
// divide by developer...
export type AppinfoPreset = {
  id: string,
  name: string,
  description: string,
  img?: string,
  author?: string,
  createAt: number,
  updateAt: number,
  tags?: string[],
  // rule | presetid
  rules: (AppInfoChangeRule | string)[] | Partial<Record<string | 'default', (AppInfoChangeRule | string)[]>>
}
