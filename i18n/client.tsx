'use client';

import { createContext, useContext } from 'react';
import { translate, type Dict, type Locale } from './dictionaries';

type Ctx = { locale: Locale; dict: Dict };
const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children
}: {
  locale: Locale;
  dict: Dict;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={{ locale, dict }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx.locale;
}

export function useT() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useT must be used inside LocaleProvider');
  return (key: string, params?: Record<string, string | number>) =>
    translate(ctx.dict, key, params);
}
