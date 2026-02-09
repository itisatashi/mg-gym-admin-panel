import { useQuery } from "@tanstack/react-query";
import { getAllMembers } from "../../services/apiMembers";

// Fetch all members
export function useAllMembers() {
  const {
    data: members,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-members"],
    queryFn: getAllMembers,
  });

  return {
    members,
    isLoading,
    error,
  };
}
