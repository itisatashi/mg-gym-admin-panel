import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key, defaultValue = "") => {
      return searchParams.get(key) || defaultValue;
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key, value) => {
      const newParams = new URLSearchParams(searchParams);

      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  return { getParam, setParam };
}
