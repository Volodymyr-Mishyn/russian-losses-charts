import "server-only";
import type { Locale } from "./i18n-config";

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  uk: () => import("../dictionaries/uk.json").then((module) => module.default),
  es: () => import("../dictionaries/es.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  de: () => import("../dictionaries/de.json").then((module) => module.default),
  it: () => import("../dictionaries/it.json").then((module) => module.default),
  ja: () => import("../dictionaries/ja.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en();
