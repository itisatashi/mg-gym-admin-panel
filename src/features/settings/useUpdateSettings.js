import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: saveSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { saveSettings, isUpdating };
}
