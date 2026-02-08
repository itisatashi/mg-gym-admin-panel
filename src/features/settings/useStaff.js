import { useQuery } from "@tanstack/react-query";
import { getStaffProfiles } from "../../services/apiAuth";

export function useStaff() {
  const { data: staff, isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: getStaffProfiles,
  });

  return { staff, isLoading };
}
