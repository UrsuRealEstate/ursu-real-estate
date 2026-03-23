import 'server-only'
import type { Locale } from '@/lib/i18n'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
  it: () => import('./dictionaries/it.json').then((module) => module.default),
}

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export type { Locale } from '@/lib/i18n'
export { locales, localeNames } from '@/lib/i18n'
