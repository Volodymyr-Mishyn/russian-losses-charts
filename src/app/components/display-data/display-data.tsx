import { fetchData } from "../../../_core/data/fetch-data";
import { ChartWrapper } from "../charts/chart-wrapper/chart-wrapper";

export async function DisplayData() {
    const data = await fetchData();
    return (
        <ChartWrapper data={data} />
    );
}