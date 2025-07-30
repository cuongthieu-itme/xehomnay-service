"use client";
import {
  ActionIcon,
  Box,
  Card,
  Container,
  Divider,
  Flex,
  NavLink,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoCarSportSharp } from "react-icons/io5";

export const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };
  return (
    <>
      <Container size="xl" py="4rem" mt="6rem">
        <Flex direction={{ base: "column", sm: "row" }}>
          <Card withBorder mah={300} w="300px" style={{ zIndex: 1 }}>
            <Box h="60px" bg="orange.6">
              <Title order={4} ta="center" py={16} c="white">
                Tài khoản của tôi
              </Title>
            </Box>
            <Box>
              <NavLink
                component={Link}
                href="/my-account/profile"
                label={<Text c="gray.6">Thông tin</Text>}
                leftSection={<CgProfile size="1.2rem" />}
                py="md"
                color="gray.6"
              />

              <NavLink
                component={Link}
                href="/my-account/bookings"
                label={<Text c="gray.6">Đặt xe</Text>}
                leftSection={<IoCarSportSharp size="1.2rem" />}
                py="md"
              />
              <Divider />
              <NavLink
                onClick={handleSignOut}
                leftSection={
                  <ActionIcon color="red">
                    <BiLogOutCircle size="1.2rem" />
                  </ActionIcon>
                }
                label={<Text c="gray.6">Đăng xuất</Text>}
                py="md"
              />
            </Box>
          </Card>
          <div className="">{children}</div>
        </Flex>
      </Container>
    </>
  );
};
