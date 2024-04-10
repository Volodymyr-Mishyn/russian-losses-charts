'use client';
import { DayResultData, DayResultFlatPartial, EntityNamesEnum, RussianLossesData, RussianLossesPartialData } from "../../../../_core/models/loss-entities";
import { useQueryParams } from "../../display-configuration-selection/hooks/query-params";
import { ChartContainer } from "../chart-container/chart-container";

export function ChartWrapper({ data }: { data: RussianLossesData }) {
    const [params] = useQueryParams();
    const { selectedEntities, startDate, endDate } = params;
    const selectedEntitiesSet = new Set(selectedEntities);
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    const dataInRange = data.filter((item) => {
        return item.date >= startDateObject && item.date <= endDateObject;
    });
    const mappedData: RussianLossesPartialData = dataInRange.map((item) => {
        const filteredObject: Partial<DayResultData> = {};
        Object.entries(item.data).forEach(([key, value]) => {
            if (selectedEntitiesSet.has(key as EntityNamesEnum)) {
                filteredObject[key as EntityNamesEnum] = value;
            }
        });
        return {
            date: item.date,
            dayOfInvasion: item.dayOfInvasion,
            data: filteredObject,
        } as DayResultFlatPartial;
    });
    return (
        <>
            <h1>Chart</h1>
            <ChartContainer data={mappedData} />
        </>
    );
}