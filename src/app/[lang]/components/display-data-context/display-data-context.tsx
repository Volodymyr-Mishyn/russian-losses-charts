import { RussianLossesPartialData } from "@/_core/models/loss-entities";
import { DictionaryElement } from "@/i18n-config";
import { DataContext } from "../_store/data-store";
import { Granularity } from "@/_core/models/data-granularity";

export function DisplayDataContext({
  data,
  dictionary,
  granularity,
  children,
}: {
  data: RussianLossesPartialData;
  dictionary: DictionaryElement;
  granularity: Granularity;
  children: React.ReactNode;
}) {
  const contextValue = {
    data,
    dictionary,
    granularity,
  };
  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
}
