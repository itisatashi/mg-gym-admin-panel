import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaffAccount } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useCreateStaff() {
  const queryClient = useQueryClient();

  const { mutate: createStaff, isPending: isCreating } = useMutation({
    mutationFn: createStaffAccount,
    onSuccess: () => {
      toast.success("Staff account created!");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createStaff, isCreating };
}
