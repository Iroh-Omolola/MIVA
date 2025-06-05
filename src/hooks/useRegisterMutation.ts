
import { useMutation } from "@tanstack/react-query";

import { useState } from "react";
import { FormikValues } from "formik";
import { RegisterResponse, UserProps } from "@/type/auth";

export const useRegisterMutation = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate: register, isPending: isLoading } = useMutation<RegisterResponse, Error, UserProps>({
 mutationFn: async (values: FormikValues) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
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
    register,
    isLoading,
    errorMessage,
    clearError: () => setErrorMessage(""),
  };
};
