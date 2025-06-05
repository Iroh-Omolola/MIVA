import { useMutation } from "@tanstack/react-query";

import { useState } from "react";
import { FormikValues } from "formik";
import { LoginResponse, UserProps } from "@/type/auth";

export const useLoginMutation = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate: login, isPending: isLoading } = useMutation<
    LoginResponse,
    Error,
    UserProps
  >({
    mutationFn: async (values: FormikValues) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      return res.json();
    },

    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  return {
    login,
    isLoading,
    errorMessage,
    clearError: () => setErrorMessage(""),
  };
};
