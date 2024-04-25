"use client";
import { useEffect, useState } from "react";
import { DictionaryElement, Locale as LangLocale } from "@/i18n-config";
import { DisplayConfigurationContext } from "./_store/display-configuration.context";
import { Locale } from "date-fns";
import { enUS } from "date-fns/locale";
import { getDateLocale } from "@/get-date-locale";

export function DisplayConfigurationSelectionContextProvider({
  dictionary,
  lang,
  children,
}: {
  dictionary: DictionaryElement;
  lang: LangLocale;
  children: React.ReactNode;
}) {
  const [dateLocale, setDateLocale] = useState<Locale>(enUS);

  useEffect(() => {
    getDateLocale(lang)
      .then(setDateLocale)
      .catch(() => {
        console.error("Failed to load the locale data for:", lang);
        setDateLocale(enUS);
      });
  }, [lang]);

  const contextValue = {
    lang,
    dictionary,
    dateLocale,
  };

  return <DisplayConfigurationContext.Provider value={contextValue}>{children}</DisplayConfigurationContext.Provider>;
}
