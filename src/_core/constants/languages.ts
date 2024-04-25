import { LanguageInfo } from "../models/language";

export const LANGUAGES: Array<LanguageInfo> = [
  {
    name: `English`,
    localeName: "en-US",
    icon: "/images/locales/gb_flag.png",
    baseHref: "en",
  },
  {
    name: `Ukrainian (Українська)`,
    localeName: "uk",
    icon: "/images/locales/ukraine_flag.png",
    baseHref: "uk",
  },
  {
    name: `Spanish (Español)`,
    localeName: "es",
    icon: "/images/locales/spain_flag.png",
    baseHref: "es",
  },
  {
    name: `French (Français)`,
    localeName: "fr",
    icon: "/images/locales/france_flag.webp",
    baseHref: "fr",
  },
  {
    name: `German (Deutsch)`,
    localeName: "de",
    icon: "/images/locales/germany_flag.png",
    baseHref: "de",
  },
  {
    name: `Italian (Italiano)`,
    localeName: "it",
    icon: "/images/locales/italy_flag.png",
    baseHref: "it",
  },
  {
    name: `Japanese (日本語)`,
    localeName: "ja",
    icon: "/images/locales/japan_flag.png",
    baseHref: "ja",
  },
];
