import { RussianLossesPartialData } from "../../../../_core/models/loss-entities";

export function ChartContainer({ data }: { data: RussianLossesPartialData }) {
    return (
        <div>
            <h1>Chart Container</h1>
            <span>{JSON.stringify(data)}</span>
        </div>
    );
}