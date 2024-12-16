import { default as app_289070 } from "./appid/289070.json";
import { default as app_1222700 } from "./appid/1222700.json";
import { default as app_1426210 } from "./appid/1426210.json";
import { default as app_1942280 } from "./appid/1942280.json";

import { default as ea } from "./publisher/electronic-arts.json";
import { default as sid_meier_s_civilization } from "./series/sid-meier_s-civilization.json";
import {AppinfoPreset} from "../interface";
export const presets = [
  app_1942280,
  app_1426210,
  app_1222700,
  app_289070,
  ea,
  sid_meier_s_civilization
] as unknown as AppinfoPreset[]

export const presetMap = presets.reduce((acc, cur) => {
  acc[cur.id] = cur
  return acc
}, {} as Record<string, AppinfoPreset>)
