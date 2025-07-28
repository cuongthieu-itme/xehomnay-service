import { useForm, UseFormReturnType } from "@mantine/form";
import { IsSignupFromType } from "../../types";
export const useSignupFrom = (): UseFormReturnType<IsSignupFromType> => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: Partial<IsSignupFromType> = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password does not match";
      }
      return errors;
    },
  });

  return form;
};
