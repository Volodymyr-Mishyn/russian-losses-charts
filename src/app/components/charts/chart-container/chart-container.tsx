import { RussianLossesPartialData } from "../../../../_core/models/loss-entities";
import { processLossDataToChartData } from "../_helpers/process-loss-data-to-chart-data";
import { LineChart } from "../line-chart/line-chart";

export function ChartContainer({ data }: { data: RussianLossesPartialData }) {
    const chartData = processLossDataToChartData(data);
    return (
        <LineChart data={chartData} />
    );
}