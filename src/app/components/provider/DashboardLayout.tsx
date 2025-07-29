"use client";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Flex,
  rem,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCar,
  IconDashboard,
  IconMessage,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { BiLogOutCircle } from "react-icons/bi";
import { MainLink } from "./MainLink";
import Notification from "./Notification";

interface DashboardProps {
  children: ReactNode;
  providerDetails: {
    name: string;
    image: string;
  };
  user: {
    id: string;
  };
}

const data = [
  {
    icon: <IconDashboard size="1rem" />,
    color: "blue",
    label: "Tổng quan",
    endpoint: "/dashboard",
  },
  {
    icon: <IconCar size="1rem" />,
    color: "violet",
    label: "Xe",
    endpoint: "/dashboard/cars",
  },
  {
    icon: <IconPlus size="1rem" />,
    color: "purple",
    label: "Quốc gia",
    endpoint: "/dashboard/add-country",
  },

  {
    icon: <IconMessage size="1rem" />,
    color: "orange",
    label: "Đánh giá",
    endpoint: "/dashboard/reviews",
  },
];
export default function DashboardLayout({
  children,
  providerDetails,
  user,
}: DashboardProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { refresh } = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully");
    refresh();
  };
  return (
    <>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "md",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Flex justify="space-between" align="center" px="md" h="100%">
            <Flex align="center">
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                hiddenFrom="md"
              />
              <Flex gap={8} align="center">
                <Avatar src={providerDetails?.image} size="sm" radius="xl" />
                <Text fw="600" style={{ overflow: "hidden" }}>
                  {providerDetails?.name}
                </Text>
              </Flex>
            </Flex>
            <Notification />
            {/* <ThemeSwitcher /> */}
            <Flex justify="flex-end" align="center">
              <ActionIcon
                onClick={handleSignOut}
                color="red"
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                <BiLogOutCircle size="1.2rem" />

                <Text
                  size="sm"
                  mx="xs"
                  className="text-muted"
                  style={{ cursor: "pointer" }}
                >
                  Đăng xuất
                </Text>
              </ActionIcon>
            </Flex>
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar px="sm">
          <AppShell.Section style={{ flex: 1 }}>
            <Stack mt="xs">
              {data?.map((item, i) => (
                <MainLink
                  key={i}
                  label={item.label}
                  color={item.color}
                  icon={item.icon}
                  link={`/provider${item.endpoint}`}
                />
              ))}
            </Stack>
          </AppShell.Section>

          <AppShell.Section>
            <MainLink
              label="Account Settings"
              color="gray"
              icon={<IconUser size="1rem" />}
              link={`/provider/dashboard/my-account`}
            />
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
