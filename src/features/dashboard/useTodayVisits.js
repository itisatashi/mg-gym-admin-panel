import { useQuery } from "@tanstack/react-query";
import { getTodayVisits } from "../../services/apiDailyVisits";

export function useTodayVisits() {
  const {
    data: visits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["daily-visits-today"],
    queryFn: getTodayVisits,
  });

  return { visits, isLoading, error };
}
