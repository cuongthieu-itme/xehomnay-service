import { useForm, UseFormReturnType } from "@mantine/form";
import { IsLoginFormType } from "../../types";

export const useLoginForm = (): UseFormReturnType<IsLoginFormType> => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<IsLoginFormType> = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
  });

  return form;
};
