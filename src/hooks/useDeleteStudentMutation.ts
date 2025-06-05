import { useMutation, useQueryClient } from "@tanstack/react-query";

// This is the hook to delete a student
export function useDeleteStudentMutation() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["students"] });
  };

  const {mutate, isPending, error,isSuccess} = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete the student");
      }
      return id; 
    },
   
    onSuccess: () => {
      invalidate();
    },
   
  });

  return {
    deleteStudent: mutate,
    isLoading: isPending,
    isSuccess,
    error,
  };
}
