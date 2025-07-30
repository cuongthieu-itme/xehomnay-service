"use client";
import { updateAdminAccount } from "@/actions/admin";
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
import ProfilePhoto from "../shared/ProfilePhoto";

const initialState = {
  name: "",
  email: "",
  image: "",
};

export default function MyAccount({ user, adminDetails }: any) {
  const { refresh } = useRouter();
  const { data: session, update } = useSession();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [details, setDetails] = useState(initialState);

  const handleUpdateAdminAccount = async () => {
    setIsUpdating(true);
    const res = await updateAdminAccount(user?.id, details);
    if (res?.status === "success") {
      await update({
        user: {
          ...session?.user,
          name: details.name,
          email: details.email,
          image: details.image,
        },
      });
      setIsUpdating(false);
      toast.success("Profile updated successfully");
      refresh();
    } else {
      toast.error(res?.error || "Failed to update profile");
      setIsUpdating(false);
    }
  };

  const updateAvatar = async (avatarUrl: string) => {
    setDetails(prev => ({ ...prev, image: avatarUrl }));
  };

  useEffect(() => {
    setDetails({
      name: adminDetails?.name || "",
      email: adminDetails?.email || "",
      image: adminDetails?.image || "",
    });
  }, [adminDetails]);

  return (
    <>
      <Toaster />
      
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-shrink-0">
          <ProfilePhoto
            profileUrl={details.image}
            updateProfile={updateAvatar}
          />
        </div>

        <div className="flex-1">
          <Title order={3} mb="lg">Admin Profile Settings</Title>
          
          <Group grow>
            <Box>
              <Input.Label>Full Name</Input.Label>
              <Input
                placeholder="Enter your full name"
                value={details.name}
                onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))}
              />
            </Box>
            <Box>
              <Input.Label>Email Address</Input.Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={details.email}
                onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))}
              />
            </Box>
          </Group>

          <Flex justify="flex-end" mt="lg">
            <Button
              variant="gradient"
              gradient={primaryGradient}
              onClick={handleUpdateAdminAccount}
              radius="xl"
              size="md"
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
              <Input.Label>Current Password</Input.Label>
              <PasswordInput placeholder="xxxxxxxxxx" disabled />
            </Box>
            <Box>
              <Input.Label>New Password</Input.Label>
              <PasswordInput placeholder="xxxxxxxxxx" disabled />
            </Box>
          </Group>

          <Box mt="md">
            <Input.Label>Confirm New Password</Input.Label>
            <PasswordInput placeholder="xxxxxxxxxx" disabled />
          </Box>

          <Flex justify="flex-end" mt="lg">
            <Button
              variant="gradient"
              gradient={primaryGradient}
              disabled
              radius="xl"
              size="md"
            >
              <Text ml="xs">Update Login</Text>
            </Button>
          </Flex>
        </div>
      </div>
    </>
  );
} 