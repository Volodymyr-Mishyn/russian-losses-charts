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
  const [selectedEntities, setSelectedEntities] = useState<EntityNamesEnum[]>(BASIC_ENTITIES_FILTER);
  const startDateObject = DATE_OF_INVASION_INSTANCE;
  const endDateObject = new Date();
  const [startDate, setStartDate] = useState<string>(dateFormatter(startDateObject));
  const [endDate, setEndDate] = useState<string>(dateFormatter(endDateObject));

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    const startDateQuery = searchParams.get("start") as string | null;
    const endDateQuery = searchParams.get("end") as string | null;
    const processedSelectedEntities = validateEntities(queryEntities);
    const [start, end] = validateDates(startDateQuery, endDateQuery);
    setSelectedEntities(processedSelectedEntities as EntityNamesEnum[]);
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
