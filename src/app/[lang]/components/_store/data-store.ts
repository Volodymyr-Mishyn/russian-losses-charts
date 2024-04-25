import { Granularity } from "@/_core/models/data-granularity";
import { RussianLossesPartialData } from "@/_core/models/loss-entities";
import { DictionaryElement } from "@/i18n-config";
import { createContext } from "react";

export interface Data {
  dictionary: DictionaryElement;
  data: RussianLossesPartialData;
  granularity: Granularity;
}
export const DataContext = createContext<Data>({
  dictionary: {} as DictionaryElement,
  data: [],
  granularity: "month",
});
