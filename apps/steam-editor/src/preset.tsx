import { cn } from "./lib/utils.ts";
import {HTMLProps} from "react";
import {AppinfoPreset} from "@repo/steam-appinfo-change-rule";



type AppInfoPresetProps =
  HTMLProps<HTMLDivElement> & AppinfoPreset

export default function AppInfoRulePreset({
  id, img, name, description, author, createAt, updateAt, ...rest
}: AppInfoPresetProps) {
  return <div {...rest} className={cn(``, rest.className)}>
    <div className={'text-md font-medium'}>{name}</div>
    <div className={'text-xs text-secondary-foreground'}>{description}</div>
  </div>
}