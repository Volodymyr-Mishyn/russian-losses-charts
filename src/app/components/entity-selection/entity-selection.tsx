import { DynamicIcon } from "@/components/dynamic-icon/dynamic-icon";
import { ENTITIES_MAP, EntityNamesEnum } from "@/_core/models/loss-entities";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
interface EntitySelectionProps {
  selectedEntities: Array<EntityNamesEnum>;
  setSelectedEntities: (selectedEntities: Array<EntityNamesEnum>) => void;
}

export function EntitySelection({ selectedEntities, setSelectedEntities }: EntitySelectionProps) {
  const selectedEntitiesSet = new Set(selectedEntities);
  function toggleEntity(entity: EntityNamesEnum) {
    if (selectedEntitiesSet.has(entity)) {
      setSelectedEntities(selectedEntities.filter((e) => e !== entity));
    } else {
      setSelectedEntities([...selectedEntities, entity]);
    }
  }

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {Object.entries(ENTITIES_MAP).map(([category, entities]) => {
        return (
          <div key={category} className="flex flex-row">
            <ToggleButtonGroup aria-label="entities">
              {entities.map((entity) => {
                return (
                  <ToggleButton
                    value="check"
                    selected={selectedEntitiesSet.has(entity)}
                    key={entity}
                    className="flex flex-row gap-1"
                    onClick={() => {
                      toggleEntity(entity);
                    }}
                  >
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
