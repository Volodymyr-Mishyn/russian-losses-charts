import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Granularity } from "../../../_core/models/data-granularity";

interface GranularitySelectionProps {
    selectedGranularity: Granularity;
    setSelectedGranularity: (selected: Granularity) => void;
}
export function GranularitySelection({ selectedGranularity, setSelectedGranularity }: GranularitySelectionProps) {
    const granularities = ["year", "month", "week", "day"] as Granularity[];
    return (
        <div className="flex flex-row flex-wrap gap-3">
            <ToggleButtonGroup aria-label="entities">
                {granularities.map((granularity) => {
                    return (
                        <ToggleButton
                            value="check"
                            selected={selectedGranularity === granularity}
                            key={granularity}
                            className="flex flex-row gap-1"
                            onClick={() => {
                                setSelectedGranularity(granularity);
                            }}
                        >
                            <span>{granularity}</span>
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>
        </div>
    );
}