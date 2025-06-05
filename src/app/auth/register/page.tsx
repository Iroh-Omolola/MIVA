"use client";

import AuthFrame from "@/component/AuthFrame";
import Link from "next/link";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserProps } from "@/type/auth";
import { useRegisterMutation } from "@/hooks/useRegisterMutation";
import { validateAuthFields } from "@/helper/validateFields";


const Register = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const { register, isLoading, errorMessage, clearError } =
    useRegisterMutation();

  const onRegister = (values: UserProps) => {
    clearError();
    register(values, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };
  return (
    <AuthFrame>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validateAuthFields}
        onSubmit={(values) => onRegister(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-full  space-y-4 h-fit bg-white  p-[40px] rounded-[8px]">
            {errorMessage !== "" && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{errorMessage}!</AlertTitle>
              </Alert>
            )}
            <Text className="text-miva-blue text-center text-xl font-bold">
              Register your account
            </Text>
            <Field name="email">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!(form.errors.email && form.touched.email)}
                >
                  <FormLabel className="text-miva-blue">Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Email"
                    focusBorderColor="gray.100"
                    _invalid={{ borderColor: "red.500" }}
                  />
                  <FormErrorMessage>
                    {typeof form.errors.email === "string"
                      ? form.errors.email
                      : ""}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!(form.errors.password && form.touched.password)}
                >
                  <FormLabel className="text-miva-blue">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="10px"
                      {...field}
                      textColor={"black"}
                      placeholder="Password"
                      focusBorderColor="gray.100"
                      _invalid={{ borderColor: "red.500" }}
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShow(!show)}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text className="text-sm text-slate-500">
                    Password must be atleast 6 characters
                  </Text>
                  <FormErrorMessage>
                    {typeof form.errors.password === "string"
                      ? form.errors.password
                      : ""}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              disabled={isLoading}
              isLoading={isLoading}
              className="bg-miva-blue text-white w-full hover:bg-hover-miva-blue"
              type="submit"
            >
              Register
            </Button>
            <Text className="text-black font-medium text-center">
              You have an account?{" "}
              <Link
                className="text-miva-blue font-medium underline"
                href={`/auth/login`}
              >
                Login
              </Link>
            </Text>
          </Form>
        )}
      </Formik>
    </AuthFrame>
  );
};

export default Register;
