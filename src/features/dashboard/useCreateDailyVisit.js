import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDailyVisit } from "../../services/apiDailyVisits";
import toast from "react-hot-toast";

export function useCreateDailyVisit() {
  const queryClient = useQueryClient();

  const { mutate: addVisit, isPending: isCreating } = useMutation({
    mutationFn: createDailyVisit,

    onSuccess: () => {
      toast.success("Day pass logged! 🎫");
      queryClient.invalidateQueries({ queryKey: ["daily-visits-today"] });
      queryClient.invalidateQueries({ queryKey: ["daily-visits-all"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addVisit, isCreating };
}
