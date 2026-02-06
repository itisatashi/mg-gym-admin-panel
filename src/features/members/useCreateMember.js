import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMember } from "../../services/apiMembers";
import toast from "react-hot-toast";

// Add new member
export function useCreateMember() {
  const queryClient = useQueryClient();

  const { mutate: createNewMember, isPending: isCreating } = useMutation({
    mutationFn: createMember,

    onSuccess: () => {
      toast.success("Member created successfully!  🎉");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createNewMember, isCreating };
}
