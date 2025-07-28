import { useForm, UseFormReturnType } from "@mantine/form";
import { IProfileDetails, IResUserProps } from "../../types";

export const useProfileForm = (
  user: IResUserProps | null
): UseFormReturnType<IProfileDetails> => {
  const form = useForm({
    initialValues: {
      firstName: user?.userProfile?.firstName || "",
      lastName: user?.userProfile?.lastName || "",
      countryId:
        user?.userProfile?.countryId?.toString() ||
        user?.countries?.id.toString() ||
        "",
      regionId:
        user?.userProfile?.regionId?.toString() ||
        user?.regions?.id?.toString() ||
        "",
      phone: user?.userProfile?.phone || "",
      city: user?.userProfile?.city || "",
      state: user?.userProfile?.state || "",
      dob: user?.userProfile?.dob || "",
      gender: user?.userProfile?.gender || "male",
      avatar: user?.image || "",
    },
    validate: {
      firstName: (value: string) => (!value ? "First Name is required" : null),
      lastName: (value: string) => (!value ? "Last Name is required" : null),
      phone: (value: string) => (!value ? "Phone number is required" : null),
      countryId: (value: string) => (!value ? "Select your country" : null),
      regionId: (value: string) => (!value ? "Select your region" : null),
      city: (value: string) => (!value ? "Enter your city name" : null),
    },
  });
  return form;
};
