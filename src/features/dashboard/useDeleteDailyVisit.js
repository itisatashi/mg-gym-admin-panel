import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDailyVisit } from "../../services/apiDailyVisits";
import toast from "react-hot-toast";

export function useDeleteDailyVisit() {
  const queryClient = useQueryClient();

  const { mutate: removeVisit, isPending: isDeleting } = useMutation({
    mutationFn: deleteDailyVisit,

    onSuccess: () => {
      toast.success("Day pass removed");
      queryClient.invalidateQueries({ queryKey: ["daily-visits-today"] });
      queryClient.invalidateQueries({ queryKey: ["daily-visits-all"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { removeVisit, isDeleting };
}
