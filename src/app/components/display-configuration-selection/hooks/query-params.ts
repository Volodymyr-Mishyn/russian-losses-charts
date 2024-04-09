import { useCallback, useEffect, useState } from "react";
import { EntityNamesEnum } from "@/_core/models/loss-entities";
import { validateDates, validateEntities } from "../../_helpers/query-params/query-params-validation";
import { BASIC_ENTITIES_FILTER } from "@/_core/constants/basic-entities-filter";
import { DATE_OF_INVASION_INSTANCE } from "@/_core/constants/russian-invasion-date";
import { dateFormatter } from "@/_core/helpers/date-formatter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QueryParamsState = {
  selectedEntities: Array<EntityNamesEnum>;
  startDate: string;
  endDate: string;
};
type UseQueryParamsReturn = [
  QueryParamsState,
  (selectedEntities: Array<EntityNamesEnum>) => void,
  (startDate: string, endDate: string) => void
];

export function useQueryParams(): UseQueryParamsReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialEntities = (searchParams.get("entities")?.split(",") || []) as Array<EntityNamesEnum>;

  const [selectedEntities, setSelectedEntities] = useState<EntityNamesEnum[]>(
    validateEntities(initialEntities) as Array<EntityNamesEnum>
  );

  const startDateQuery = searchParams.get("start") as string | null;
  const endDateQuery = searchParams.get("end") as string | null;
  const [start, end] = validateDates(startDateQuery, endDateQuery);
  const [startDate, setStartDate] = useState<string>(start);
  const [endDate, setEndDate] = useState<string>(end);

  const createQueryString = useCallback(
    (newParams: Array<[string, string]>) => {
      const params = new URLSearchParams(searchParams.toString());
      newParams.forEach(([name, value]) => {
        params.set(name, value);
      });
      return params.toString();
    },
    [searchParams]
  );

  const updateQueryEntities = useCallback(
    (selectedEntities: Array<string>) => {
      const validEntities = validateEntities(selectedEntities);
      const entities = validEntities.join(",");
      const queryString = createQueryString([["entities", entities]]);
      router.push(pathname + "?" + queryString);
    },
    [createQueryString, pathname, router]
  );

  const updateQueryDates = useCallback(
    (startDate: string | null, endDate: string | null) => {
      const [validStartDate, validEndDate] = validateDates(startDate, endDate);
      const queryString = createQueryString([
        ["start", validStartDate],
        ["end", validEndDate],
      ]);
      router.push(pathname + "?" + queryString);
    },
    [createQueryString, pathname, router]
  );

  useEffect(() => {
    const entities = searchParams.get("entities");
    const queryEntities = entities ? ((entities as string).split(",") as EntityNamesEnum[]) : [];
    const processedSelectedEntities = validateEntities(queryEntities);
    setSelectedEntities(processedSelectedEntities as EntityNamesEnum[]);

    const startDateQuery = searchParams.get("start") as string | null;
    const endDateQuery = searchParams.get("end") as string | null;
    const [start, end] = validateDates(startDateQuery, endDateQuery);
    setStartDate(start);
    setEndDate(end);

    if (startDateQuery !== start || endDateQuery !== end) {
      updateQueryDates(start, end);
    }
    if (entities !== processedSelectedEntities.join(",")) {
      updateQueryEntities(processedSelectedEntities);
    }
  }, [searchParams, updateQueryEntities, updateQueryDates]);

  return [{ selectedEntities, startDate, endDate }, updateQueryEntities, updateQueryDates];
}
