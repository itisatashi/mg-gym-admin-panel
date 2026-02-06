import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../../services/apiMembers";

// Fetch all members
export function useMembers() {
  const {
    data: members,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  return { members, isLoading, error };
}
