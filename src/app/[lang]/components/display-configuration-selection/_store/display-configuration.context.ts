import { DictionaryElement, Locale as LangLocale } from "@/i18n-config";
import { Locale } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { createContext } from "react";

export interface DisplayConfigurationContextType {
  lang: LangLocale | null;
  dictionary: DictionaryElement;
  dateLocale: Locale;
}
export const DisplayConfigurationContext = createContext<DisplayConfigurationContextType>({
  lang: null,
  dictionary: {} as DictionaryElement,
  dateLocale: enUS,
});
