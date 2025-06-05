"use client";

import React, { useEffect } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import PageFrame from "@/component/PageFrame";
import validatePage from "@/component/ValidatePage";
import { useStudentQuery } from "@/hooks/useFetchStudentQuery";
import { useUpdateStudentMutation } from "@/hooks/useUpdateStudentMutation";
import { validateFields } from "@/helper/validateFields";

const EditStudent = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data: student, isLoading } = useStudentQuery(String(id), {
    enabled: !!id,
  });
  const { updateStudent, isSubmitting, errorMessage, clearError, isSuccess } =
    useUpdateStudentMutation(String(id));

  useEffect(() => {
    if (isSuccess) {
      router.push("/students");
      
    }
  }, [isSuccess]);
  return (
    <PageFrame>
      {isLoading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          {!student ? (
            <Center
              h="100px"
              color="white"
              className="mb-10 mt-20 bg-miva-blue mx-10 text-lg"
            >
              No details available
            </Center>
          ) : (
            <div className="md:px-20 px-5 py-20 flex justify-center">
              <Formik
                initialValues={{
                  id: "",
                  name: student?.name || "",
                  registrationNumber: student?.registrationNumber || "",
                  gpa: String(student?.gpa) || "",
                  major: student?.major || "",
                  dob: student?.dob || "",
                }}
                enableReinitialize
                validate={validateFields}
                onSubmit={(values) => {
                  clearError();
                  updateStudent(values);
                }}
              >
                {({ setFieldValue }) => (
                  <Form className="bg-white w-[95%]  md:w-[50%] p-10 shadow-lg space-y-4 rounded-md ">
                    {errorMessage !== "" && (
                      <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>{errorMessage}!</AlertTitle>
                      </Alert>
                    )}
                    <Text className="text-miva-blue text-center text-xl font-bold">
                      Edit Student Details
                    </Text>
                    <Field name="name">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={!!(form.errors.name && form.touched.name)}
                        >
                          <FormLabel className="text-miva-blue">
                            First Name
                          </FormLabel>
                          <Input
                            {...field}
                            placeholder="Name"
                            focusBorderColor="gray.100"
                            _invalid={{ borderColor: "red.500" }}
                          />
                          <FormErrorMessage>
                            {typeof form.errors.name === "string"
                              ? form.errors.name
                              : ""}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="registrationNumber">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={
                            !!(
                              form.errors.registrationNumber &&
                              form.touched.registrationNumber
                            )
                          }
                        >
                          <FormLabel className="text-miva-blue">
                            Registration Number
                          </FormLabel>
                          <Input
                            {...field}
                            textColor={"black"}
                            placeholder="Registration Number"
                            focusBorderColor="gray.100"
                            _invalid={{ borderColor: "red.500" }}
                          />
                          <FormErrorMessage>
                            {typeof form.errors.registrationNumber === "string"
                              ? form.errors.registrationNumber
                              : ""}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="major">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={
                            !!(form.errors.major && form.touched.major)
                          }
                        >
                          <FormLabel className="text-miva-blue">
                            Major
                          </FormLabel>
                          <Input
                            {...field}
                            placeholder="Major"
                            focusBorderColor="gray.100"
                            _invalid={{ borderColor: "red.500" }}
                          />
                          <FormErrorMessage>
                            {typeof form.errors.major === "string"
                              ? form.errors.major
                              : ""}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="dob">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={!!(form.errors.dob && form.touched.dob)}
                        >
                          <FormLabel className="text-miva-blue">
                            Date of Birth
                          </FormLabel>
                          <Input
                            {...field}
                            type="date"
                            focusBorderColor="gray.100"
                            _invalid={{ borderColor: "red.500" }}
                            placeholder="Date of Birth"
                          />
                          <FormErrorMessage>
                            {typeof form.errors.dob === "string"
                              ? form.errors.dob
                              : ""}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="gpa">
                      {({ field, form }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={!!(form.errors.gpa && form.touched.gpa)}
                        >
                          <FormLabel className="text-miva-blue">GPA</FormLabel>
                          <Input
                            {...field}
                            value={form.values.gpa}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (/^\d*\.?\d*$/.test(inputValue)) {
                                setFieldValue("gpa", inputValue);
                              }
                            }}
                            focusBorderColor="gray.100"
                            _invalid={{ borderColor: "red.500" }}
                            placeholder="GPA"
                          />
                          <Text className="text-sm text-slate-500">
                            Maximum GPA is 5
                          </Text>

                          <FormErrorMessage>
                            {typeof form.errors.gpa === "string"
                              ? form.errors.gpa
                              : ""}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={4}
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      className="bg-miva-blue text-white w-full hover:bg-hover-miva-blue"
                      type="submit"
                    >
                      Update
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </>
      )}
    </PageFrame>
  );
};

export default validatePage(EditStudent);
