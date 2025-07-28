"use client";
import { Group, Paper, rem, SimpleGrid, Text } from "@mantine/core";
import { ReactNode } from "react";
interface StatsGridProps {
  data: {
    title: string;
    icon: ReactNode;
    value: string;
  }[];
}

export default function AdminStats({ data }: StatsGridProps) {
  const stats = data.map((stat) => {
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text
            size="xs"
            c="dimmed"
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {stat.title}
          </Text>
          <div>{stat.icon}</div>
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text
            style={{
              fontSize: rem(24),
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {stat.value}
          </Text>
        </Group>
      </Paper>
    );
  });
  return (
    <div style={{ padding: rem(16) }}>
      <SimpleGrid
        cols={{ base: 1, md: 2, lg: 4 }}
        spacing={{ base: 8, sm: "lg" }}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}
