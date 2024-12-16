import {presetMap} from "./data";
import {AppinfoPreset, AppInfoChangeRule} from "./interface";

export const getPresetById = (id: string) => {
  if (id in presetMap) return presetMap[id]
}


// preset schema
// appinfo-preset://${id}?variant=default
/*const schemaRegex = /^appinfo-preset:\/\/([^?]+)([?])/*/
export const getPresetRulesByIdOrURI = (uri: string) => {
  let preset:AppinfoPreset
  let variant: string = 'default'
  try {
    const u = new URL(uri)
    let path = u.pathname.replace(/^\/\//, '')
    preset = presetMap[path]
    variant = u.searchParams.get('variant') || 'default'
  }catch (e) {
    preset = presetMap[uri]
  }
  if (!preset) {
    return []
  }
  const result:AppInfoChangeRule[] = []
  let rules: (string | AppInfoChangeRule)[] = []
  if(!(preset.rules instanceof Array)) {
    // as an record
    rules = preset.rules[variant] || preset.rules?.default || []
  }else {
    rules = preset.rules
  }
  const _rules = rules.filter(rule => typeof rule !== 'string')
  const deps = rules.filter(rule => typeof rule === 'string')
  const otherRules = deps.flatMap(getPresetRulesByIdOrURI)
  result.push(..._rules, ...otherRules)
  return result
}

export const extractRuleFromPreset = (preset: AppinfoPreset, variant: string = "default", onPresetNotFound: (id: string) => void = (id: string)=>{}) => {
  let rules: (string | AppInfoChangeRule)[] = []
  if(!(preset.rules instanceof Array)) {
    rules = preset.rules[variant] || preset.rules?.default || []
  }else {
    rules = preset.rules
  }
  const result = rules.filter(rule => typeof rule !== 'string')
  for(const rule of rules) {
    if(typeof rule === 'string') {
      const subrules = getPresetRulesByIdOrURI(rule)
      result.push(...subrules)
    }
  }
  return result
}

export const loadPresetById = async (id: string) => {
  // load from remove
  if (id in presetMap) return presetMap[id]
}

export const loadPresetByAppIds = async (appids: number[]) => {
  const presetId = (appid: number) => `appinfopreset/${appid}`

  return Promise.all(appids.map(appid => loadPresetById(presetId(appid))))
    .then(presets => presets.filter(it => it))
}