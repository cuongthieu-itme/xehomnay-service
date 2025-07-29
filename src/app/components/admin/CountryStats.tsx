"use client";
import { Card, Text, Group, Badge } from "@mantine/core";
import { IconMapPin, IconGlobe, IconCheck, IconX } from "@tabler/icons-react";

interface CountryStatsProps {
  countries: any[];
}

export default function CountryStats({ countries }: CountryStatsProps) {
  const totalCountries = countries?.length || 0;
  const activeCountries = countries?.filter(c => c.status === "active").length || 0;
  const inactiveCountries = countries?.filter(c => c.status === "inactive").length || 0;
  const countriesWithCoordinates = countries?.filter(c => c.longitude && c.latitude).length || 0;

  const stats = [
    {
      title: "Total Countries",
      value: totalCountries,
      icon: <IconGlobe size={24} />,
      color: "blue",
    },
    {
      title: "Active Countries",
      value: activeCountries,
      icon: <IconCheck size={24} />,
      color: "green",
    },
    {
      title: "Inactive Countries",
      value: inactiveCountries,
      icon: <IconX size={24} />,
      color: "red",
    },
    {
      title: "With Coordinates",
      value: countriesWithCoordinates,
      icon: <IconMapPin size={24} />,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text fw={500} size="sm" c="dimmed">
              {stat.title}
            </Text>
            <div className={`text-${stat.color}-500`}>
              {stat.icon}
            </div>
          </Group>
          <Text size="xl" fw={700}>
            {stat.value}
          </Text>
          {stat.title === "Active Countries" && totalCountries > 0 && (
            <Text size="xs" c="dimmed" mt={4}>
              {Math.round((activeCountries / totalCountries) * 100)}% of total
            </Text>
          )}
        </Card>
      ))}
    </div>
  );
}