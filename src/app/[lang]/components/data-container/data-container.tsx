import { fetchData } from "../../../../_core/data/fetch-data";
import { DisplayData } from "../display-data/display-data";

export async function DataContainer() {
  const data = await fetchData();
  return <DisplayData data={data} />;
}
