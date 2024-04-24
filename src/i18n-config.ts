export const i18n = {
  defaultLocale: "en",
  // locales: ["en", "uk", "es", "fr", "de", "it", "ja"],
  locales: ["en", "uk"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export interface DictionaryElement {
  [key: string]: DictionaryElement | string;
}
