import { cookies } from 'next/headers';
import {
  defaultLocale,
  dictionaries,
  locales,
  translate,
  type Dict,
  type Locale
} from './dictionaries';

export async function getLocale(): Promise<Locale> {
  const c = await cookies();
  const val = c.get('locale')?.value as Locale | undefined;
  return val && locales.includes(val) ? val : defaultLocale;
}

export async function getDict(): Promise<{
  locale: Locale;
  dict: Dict;
  t: (key: string, params?: Record<string, string | number>) => string;
}> {
  const locale = await getLocale();
  const dict = dictionaries[locale];
  return {
    locale,
    dict,
    t: (key, params) => translate(dict, key, params)
  };
}
