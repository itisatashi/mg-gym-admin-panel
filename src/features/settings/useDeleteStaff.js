import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStaffProfile } from "../../services/apiAuth";

import toast from "react-hot-toast";

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  const { mutate: deleteStaff, isPending: isDeleting } = useMutation({
    mutationFn: deleteStaffProfile,
    onSuccess: () => {
      toast.success("Staff removed successfully");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteStaff, isDeleting };
}
