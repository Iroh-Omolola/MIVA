import { UserProps } from "@/type/auth";
import { Student } from "@/type/student";

type ValidationErrors = Partial<Record<keyof Student, string>>;

export const validateFields = (values: Student): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.registrationNumber) {
    errors.registrationNumber = "Registration number is required";
  }
  if (!values.major) {
    errors.major = "Major is required";
  }
  if (!values.dob) {
    errors.dob = "Date of Birth is required";
  }
  if (values.gpa === null || values.gpa === undefined) {
    errors.gpa = "GPA is required";
  } else if (!/^\d+(\.\d+)?$/.test(values.gpa)) {
    errors.gpa = "GPA must be a valid number";
  } else if (parseFloat(values.gpa) > 5) {
    errors.gpa = "GPA cannot be more than 5";
  }
  return errors;
};

export const validateAuthFields = (values: UserProps) => {
  const errors: Partial<UserProps> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email is invalid";
  }
  const passwordRegex = /.{6,}/;
  if (!values.password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(values.password)) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
};