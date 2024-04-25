import { DictionaryElement } from "@/i18n-config";
import { fetchData } from "../../../../_core/data/fetch-data";
import { DisplayData } from "../display-data/display-data";

export async function DataContainer({ dictionary }: { dictionary: DictionaryElement }) {
  const data = await fetchData();
  return <DisplayData data={data} dictionary={dictionary} />;
}
