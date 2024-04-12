import { useMemo } from "react";
import { Granularity } from "../../../../_core/models/data-granularity";
import { RussianLossesPartialData } from "../../../../_core/models/loss-entities";
import { processLossDataToChartData } from "../_helpers/process-loss-data-to-chart-data";
import { LineChart } from "../line-chart/line-chart";
import { format } from "date-fns";

export function ChartContainer({ data, granularity }: { data: RussianLossesPartialData, granularity: Granularity }) {
    const chartData = useMemo(() => processLossDataToChartData(data, { fill: true, hasBackgroundColour: true, hasBorderColour: true }, granularity), [data, granularity]);
    let title = `Losses of `;
    if (data.length > 0) {
        title += Object.keys(data[0].data).join(', ');
        title += ' in range of dates ' + format(data[0].date, 'yyyy-MM-dd') + ' to ' + format(data[data.length - 1].date, 'yyyy-MM-dd');
    }
    title += ` by ${granularity}`;
    return (
        <LineChart data={chartData} title={title} />
    );
}