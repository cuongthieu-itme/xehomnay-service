"use client";
import { Card, Text, Group } from "@mantine/core";
import { IconMapPin, IconGlobe, IconCheck, IconX } from "@tabler/icons-react";

interface RegionStatsProps {
  regions: any[];
}

export default function RegionStats({ regions }: RegionStatsProps) {
  const totalRegions = regions?.length || 0;
  const activeRegions = regions?.filter(r => r.status === "active").length || 0;
  const inactiveRegions = regions?.filter(r => r.status === "inactive").length || 0;
  const regionsWithCoordinates = regions?.filter(r => r.longitude && r.latitude).length || 0;

  // Group regions by country
  const regionsByCountry = regions?.reduce((acc: any, region: any) => {
    const countryName = region.country?.name || "Unknown";
    acc[countryName] = (acc[countryName] || 0) + 1;
    return acc;
  }, {}) || {};

  const topCountries = Object.entries(regionsByCountry)
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 3);

  const stats = [
    {
      title: "Total Regions",
      value: totalRegions,
      icon: <IconGlobe size={24} />,
      color: "blue",
    },
    {
      title: "Active Regions",
      value: activeRegions,
      icon: <IconCheck size={24} />,
      color: "green",
    },
    {
      title: "Inactive Regions",
      value: inactiveRegions,
      icon: <IconX size={24} />,
      color: "red",
    },
    {
      title: "With Coordinates",
      value: regionsWithCoordinates,
      icon: <IconMapPin size={24} />,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            {stat.title === "Active Regions" && totalRegions > 0 && (
              <Text size="xs" c="dimmed" mt={4}>
                {Math.round((activeRegions / totalRegions) * 100)}% of total
              </Text>
            )}
          </Card>
        ))}
      </div>

      {topCountries.length > 0 && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text fw={600} size="lg" mb="md">
            Top Countries by Regions
          </Text>
          <div className="space-y-2">
            {topCountries.map(([country, count]: any, index: number) => (
              <div key={country} className="flex justify-between items-center">
                <Text size="sm">
                  {index + 1}. {country}
                </Text>
                <Text size="sm" fw={600} c="blue">
                  {count} regions
                </Text>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}