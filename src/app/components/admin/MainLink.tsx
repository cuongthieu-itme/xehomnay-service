import { NavLink, Text, ThemeIcon } from "@mantine/core";
import Link from "next/link";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

export function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <NavLink
      component={Link}
      href={link}
      leftSection={
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
      }
      label={<Text size="sm">{label}</Text>}
      w="100%"
      p="xs"
    />
  );
}
