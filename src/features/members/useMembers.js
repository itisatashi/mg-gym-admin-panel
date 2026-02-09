import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMembers } from "../../services/apiMembers";

export function useMembers({ page = 1, search = "", status = "" } = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["members", page, search, status],
    queryFn: () => getMembers({ page, search, status }),
  });

  function prefetchPage(targetPage) {
    queryClient.prefetchQuery({
      queryKey: ["members", targetPage, search, status],
      queryFn: () => getMembers({ page: targetPage, search, status }),
      staleTime: 60 * 100,
    });
  }

  return {
    members: data?.members || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    error,
    prefetchPage,
  };
}
