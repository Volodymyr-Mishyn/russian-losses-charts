import "server-only";
import type { Locale } from "./i18n-config";

// Update the type definition of the dictionaries object
const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  uk: () => import("../dictionaries/uk.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en();
