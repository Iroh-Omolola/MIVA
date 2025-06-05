import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Student } from "@/type/student";
import { getStudentQueryKey } from "./useFetchStudentQuery";

export function useUpdateStudentMutation(id: string) {
      const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>("");


  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["students"] });
  };
 const invalidateStudentId = () => {
    queryClient.invalidateQueries({ queryKey: getStudentQueryKey(id) });
  };
  const { mutate, isPending, isSuccess } = useMutation<void, Error, Student>({
    mutationFn: async (values) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          registrationNumber: values.registrationNumber,
          gpa: Number(values.gpa),
          major: values.major,
          dob: values.dob,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update student");
      }
    },
    onMutate: () => {
      setErrorMessage("");
    },
    onSuccess: () => {
      setErrorMessage("");
      invalidate()
      invalidateStudentId()
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return {
    updateStudent: mutate,
    isSubmitting: isPending,
    isSuccess,
    errorMessage,
    clearError: () => setErrorMessage(""),
  };
}
