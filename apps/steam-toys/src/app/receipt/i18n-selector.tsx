import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {useLocale} from "@/components/providers/i18n";
import {availableLocales} from "@/i18n";



export const I18nSelector = () => {
  const { locale, setLocale } = useLocale()
  return <Select defaultValue={locale} onValueChange={(v) => {setLocale(v as any)}} value={locale}>
    <SelectTrigger className="w-[100px]">
      <SelectValue/>
    </SelectTrigger>
    <SelectContent>
      {
        availableLocales.map(({label, value}) => <SelectItem key={value} value={value}>{label}</SelectItem>)
      }
    </SelectContent>
  </Select>

}