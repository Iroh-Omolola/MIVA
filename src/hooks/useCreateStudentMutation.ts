import { Student } from "@/type/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useCreateStudentMutation() {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["students"] });
  };
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: Student) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students`, {
        method: "POST",
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
        throw new Error(errorData.message || "Failed to create student");
      }

      return res.json();
    },
    onMutate: () => {
      setErrorMessage("");
    },
    onSuccess: () => {
      setErrorMessage("");
      invalidate();
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  return {
    createStudent: mutate,
    isSubmitting: isPending,
    isSuccess,
    errorMessage,
    resetError: () => setErrorMessage(""),
  };
}
