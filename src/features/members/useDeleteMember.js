import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

// Delete member
export function useDeleteMember() {
  const queryClient = useQueryClient();

  const { mutate: removeMember, isPending: isDeleting } = useMutation({
    mutationFn: deleteMember,

    onSuccess: () => {
      toast.success("Member deleted successfully!  🎉");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["all-members"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { removeMember, isDeleting };
}
