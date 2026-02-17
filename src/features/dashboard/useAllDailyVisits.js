import { useQuery } from "@tanstack/react-query";
import { getAllDailyVisits } from "../../services/apiDailyVisits";

export function useAllDailyVisits() {
  const {
    data: dailyVisits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["daily-visits-all"],
    queryFn: getAllDailyVisits,
  });

  return { dailyVisits, isLoading, error };
}
