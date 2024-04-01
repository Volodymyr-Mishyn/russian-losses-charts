import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";
import { ENTITIES_MAP } from "@/_core/models/loss-entities";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export function EntitySelection() {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      {Object.entries(ENTITIES_MAP).map(([category, entities]) => {
        return (
          <div key={category} className="flex flex-row">
            <ToggleButtonGroup aria-label="entities">
              {entities.map((entity) => {
                return (
                  <ToggleButton value="check" selected={false} key={entity} className="flex flex-row gap-1">
                    <DynamicIcon name={entity} path="/images" size={24} />
                    <span>{entity}</span>
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </div>
        );
      })}
    </div>
  );
}
