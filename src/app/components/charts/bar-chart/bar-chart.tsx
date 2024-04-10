import { RussianLossesPartialData } from "../../../../_core/models/loss-entities";

export function BarChart({ data }: { data: RussianLossesPartialData }) {
    return (
        <div>
            <h1>Bar Chart</h1>
            <span>{JSON.stringify(data)}</span>
        </div>
    );
}