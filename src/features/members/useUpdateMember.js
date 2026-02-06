import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

// Update/edit member
export function useUpdateMember() {
  const queryClient = useQueryClient();

  const { mutate: editMember, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateMember(id, data),

    onSuccess: () => {
      toast.success("Member updated successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editMember, isUpdating };
}
