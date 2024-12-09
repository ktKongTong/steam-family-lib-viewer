'use client'

import {createTrans} from "@ktfun/sts-i18n-react";
import { localeMap } from "@/i18n";

export const { useTrans, LocaleProvider, useLocale } = createTrans(localeMap, 'en-US')