import { Locale } from "./i18n-config";

const locales: Record<Locale, () => Promise<any>> = {
  en: () => import("date-fns/locale/en-US").then((module) => module.default),
  uk: () => import("date-fns/locale/uk").then((module) => module.default),
};

export const getDateLocale = async (locale: Locale) => locales[locale]?.() ?? locales.en();
