"use client";
import { updateProviderAccount } from "@/actions/auth";
import { primaryGradient } from "@/const";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Input,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IReqProviderProps } from "../../../../types";
import ProviderCompanyDetails from "./ProviderAccount";
const initialState: Partial<IReqProviderProps> = {
  email: "",
  businessReg: "",
  city: "",
  companyName: "",
  contactName: "",
  contactPhone: "",
  street: "",
  avatar: "",
};

export default function MyAccount({ user, providerDetails }: any) {
  const { refresh } = useRouter();
  const { data: session, update } = useSession();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [details, setDetails] =
    useState<Partial<IReqProviderProps>>(initialState);
  const handleUpdateProviderAccount = async () => {
    setIsUpdating(true);
    const res = await updateProviderAccount(
      user?.id,
      providerDetails?.Provider[0]?.id,
      details
    );
    if (res?.status === "success") {
      await update({
        user: {
          ...session?.user,
          name: `${details.contactName}`,
          image: details.avatar,
        },
      });
      setIsUpdating(false);
      toast.success("Profile updated successfully");
      refresh();
    } else {
      toast.error("Failed to update profile");
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    setDetails((prevState) => ({
      ...prevState,
      ...providerDetails?.Provider[0],
    }));
  }, [providerDetails, user]);

  return (
    <>
      <Toaster />

      <ProviderCompanyDetails
        mode="edit"
        companyDetails={details}
        setCompanyDetails={setDetails}
      />

      <Flex justify="flex-end">
        <Button
          variant="gradient"
          gradient={primaryGradient}
          onClick={handleUpdateProviderAccount}
          radius="xl"
          size="md"
          my="sm"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </Button>
      </Flex>

      <Divider
        label={
          <Title order={4} className="text-default">
            Login Details
          </Title>
        }
        labelPosition="center"
        my="lg"
      />

      <Group grow>
        <Box>
          <Input.Label>Email Address</Input.Label>
          <Input
            type="email"
            placeholder="cargo@gmail.com"
            defaultValue={details.email}
            disabled
          />
        </Box>
        <Box>
          <Input.Label>Current Password</Input.Label>
          <PasswordInput placeholder="xxxxxxxxxx" disabled />
        </Box>
      </Group>

      <Group grow>
        <Box>
          <Input.Label>New Password</Input.Label>
          <PasswordInput placeholder="xxxxxxxxxx" disabled />
        </Box>
        <Box>
          <Input.Label>Confirm New Password</Input.Label>
          <PasswordInput placeholder="xxxxxxxxxx" disabled />
        </Box>
      </Group>

      <Flex justify="flex-end">
        <Button
          variant="gradient"
          gradient={primaryGradient}
          disabled
          radius="xl"
          size="md"
          my="sm"
        >
          <Text ml="xs">Update Login</Text>
        </Button>
      </Flex>
    </>
  );
}
