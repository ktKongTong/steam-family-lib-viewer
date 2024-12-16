import {AppInfoChangeRule, AppinfoPreset, Target} from "./interface";
import {AppInfo} from "@repo/steam-vdf";
import {extractRuleFromPreset, getPresetById} from "./rule-getter";

const appInfoChangeRuleToVDFChangeRule = (rule: AppInfoChangeRule) => {
  const changeset: Target[] = []
  if(rule.modifiedName)  {
    changeset.push({
      path: 'appinfo.common.name',
      value: rule.modifiedName,
      type: 'str'
    })
  }
  if(rule.sortas)  {
    changeset.push({
      path: 'appinfo.common.sortas',
      value: rule.sortas,
      type: 'str'
    })
  }
  if(rule.localized)  {
    for(const lang in rule.localized) {
      changeset.push({
        path: `appinfo.common.name_localized.${lang}`,
        // @ts-ignore
        value: rule.localized[lang as keyof typeof rule.localized],
        type: 'str'
      })
    }
  }
  return {
    appid: rule.appid,
    name: rule.name,
    type: rule.type,
    date: Math.floor(Date.now()/1000),
    changesets: changeset
  }
}



export const applyAppinfoPresets = (appinfo: AppInfo[], presets: AppinfoPreset[], onPresetNotFound: (id: string) => void = (id: string) => {}) => {
  const  rules= presets.flatMap((it) => extractRuleFromPreset(it))
  applyAppinfoChangesets(appinfo, rules)
}

export const applyAppinfoChangesets = (appinfo: AppInfo[], changesets: AppInfoChangeRule[]) => {
  for(const changeset of changesets) {
    const app = appinfo.find(app => app.appid == changeset.appid)
    if(!app) {
      continue
    }
    applyAppInfoChangeset(app, changeset)
  }
}


// assume is same appid
// current is work as mutable fn
export const applyAppInfoChangeset = (appinfo: AppInfo, changeset: AppInfoChangeRule)=> {
  if(appinfo.appid!= changeset.appid) {
    throw new Error(`appid not match,appinfo:${appinfo.appid}, changeset:${changeset.appid}`)
  }
  const vdfRule = appInfoChangeRuleToVDFChangeRule(changeset)

  const rules = vdfRule.changesets

  for(const change of rules) {

    let bvdfField = appinfo.data.appinfo
    // todo now assume path start with appinfo
    const path = change.path.split('.')
    // first path must be appinfo
    const prevPath = path.slice(1, path.length - 1)
    // last path type must not object
    const lastPath = path[path.length - 1]
    for(const key of prevPath) {
      if(bvdfField.type != 'object') {
        throw new Error(`${change.path} is not object`)
      }
      // if path not exist create it
      if(!bvdfField.data[key]) {
        bvdfField.data[key] = {
          type: 'object',
          name: key,
          data: {},
          // order is not important here
          order: 1 << 31 - 1
        }
      }else {
        bvdfField = bvdfField.data[key]
      }
    }
    if(bvdfField.type != 'object') {
      throw new Error(`${change.path} is not object`)
    }
    const target = bvdfField.data[lastPath]
    if (target == undefined) {
      bvdfField.data[lastPath] = {
        type: change.type,
        data: change.value,
        name: lastPath,
        order: 1 << 31 - 1
      } as any
    }else {
      if(bvdfField.data[lastPath].type != change.type) {
        throw new Error(`${change.path} type not match, expect${bvdfField.data[lastPath].type}`)
      }
      // lastpath
      bvdfField.data[lastPath].data = change.value
    }
  }
}


