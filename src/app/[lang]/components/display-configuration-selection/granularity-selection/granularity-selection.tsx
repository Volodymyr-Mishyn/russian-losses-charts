import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Granularity } from "../../../../../_core/models/data-granularity";
import { DisplayConfigurationContext } from "../_store/display-configuration.context";
import { useContext } from "react";
import { DictionaryElement } from "@/i18n-config";

interface GranularitySelectionProps {
  selectedGranularity: Granularity;
  setSelectedGranularity: (selected: Granularity) => void;
}

export function GranularitySelection({ selectedGranularity, setSelectedGranularity }: GranularitySelectionProps) {
  const granularity = ["year", "month", "week", "day"] as Granularity[];
  const context = useContext(DisplayConfigurationContext);
  return (
    <div className="flex flex-row flex-wrap gap-3">
      <ToggleButtonGroup aria-label="entities">
        {granularity.map((granularity) => {
          const granularityName = (context.dictionary.granularitySelection as DictionaryElement)[granularity] as string;
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
              <span>{granularityName}</span>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
}
