'use client'

import {createTrans} from "@ktfun/sts-i18n-react";
import { localeMap } from "@/i18n";

export const { useTrans, LocaleProvider: L, useLocale } = createTrans(localeMap, 'en-US')

export const  LocaleProvider = (
  {children}: { children: React.ReactNode; }
) =>   <L>{children}</L>