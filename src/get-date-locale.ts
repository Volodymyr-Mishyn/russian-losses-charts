import { Locale } from "./i18n-config";

const locales: Record<Locale, () => Promise<any>> = {
  en: () => import("date-fns/locale/en-US").then((module) => module.default),
  uk: () => import("date-fns/locale/uk").then((module) => module.default),
  de: () => import("date-fns/locale/de").then((module) => module.default),
  es: () => import("date-fns/locale/es").then((module) => module.default),
  fr: () => import("date-fns/locale/fr").then((module) => module.default),
  it: () => import("date-fns/locale/it").then((module) => module.default),
  ja: () => import("date-fns/locale/ja").then((module) => module.default),
};

export const getDateLocale = async (locale: Locale) => locales[locale]?.() ?? locales.en();
