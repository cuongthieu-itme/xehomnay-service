"use client";
import Toast from "@/lib/Toast";
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
  IconDashboard,
  IconMessage,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { Map } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { BiLogOutCircle } from "react-icons/bi";
import { MainLink } from "./MainLink";

interface DashboardProps {
  children: ReactNode;
  adminDetails: {
    name: string;
    image: string;
    email: string;
  };
  user: {
    id: string;
  };
}

const data = [
  {
    icon: <IconDashboard size="1rem" />,
    color: "blue",
    label: "Dashboard",
    endpoint: "/dashboard",
  },
  {
    icon: <IconUsers size="1rem" />,
    color: "violet",
    label: "All Providers",
    endpoint: "/dashboard/all-provider",
  },
  {
    icon: <Map size="1rem" />,
    color: "purple",
    label: "Country",
    endpoint: "/dashboard/all-country",
  },

  // {
  //   icon: <IconMessage size="1rem" />,
  //   color: "orange",
  //   label: "Pages",
  //   endpoint: "/dashboard/pages-list",
  // },
  // {
  //   icon: <IconMessage size="1rem" />,
  //   color: "blue",
  //   label: "Blog",
  //   endpoint: "/dashboard/blog-list",
  // },
  // {
  //   icon: <IconSettings size="1rem" />,
  //   color: "cyan",
  //   label: "Website Settings",
  //   endpoint: "/dashboard/website-settings",
  // },
];
export default function AdminDashboard({
  children,
  adminDetails,
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
        <Toast />
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
                <Avatar src={adminDetails?.image} size="sm" radius="xl" />
                <Text fw="600" style={{ overflow: "hidden" }}>
                  {adminDetails?.name || adminDetails?.email}
                </Text>
              </Flex>
            </Flex>
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
                  link={`/admin${item.endpoint}`}
                />
              ))}
            </Stack>
          </AppShell.Section>

          <AppShell.Section>
            <MainLink
              label="Account Settings"
              color="gray"
              icon={<IconUser size="1rem" />}
              link={`/admin/dashboard/my-account`}
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
