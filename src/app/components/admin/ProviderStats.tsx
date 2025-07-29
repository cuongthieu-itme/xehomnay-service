"use client";
import { Card, Text, Group, Badge, Grid } from "@mantine/core";
import { IconBuilding, IconUsers, IconCar, IconStar } from "@tabler/icons-react";

interface ProviderStatsProps {
  providers: any[];
}

export default function ProviderStats({ providers }: ProviderStatsProps) {
  if (!providers || providers.length === 0) {
    return (
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Provider Statistics
        </Text>
        <Text c="dimmed" ta="center">
          No providers found
        </Text>
      </Card>
    );
  }

  // Calculate statistics
  const totalProviders = providers.length;
  const activeProviders = providers.filter(p => p.active).length;
  const inactiveProviders = providers.filter(p => p.active === false).length;
  const providersWithCars = providers.filter(p => p._count?.Car > 0).length;
  const providersWithBookings = providers.filter(p => p._count?.Booking > 0).length;
  const providersWithReviews = providers.filter(p => p._count?.Review > 0).length;

  // Top providers by activity
  const topActiveProviders = providers
    .filter(p => p._count?.Car > 0 || p._count?.Booking > 0)
    .sort((a, b) => {
      const aScore = (a._count?.Car || 0) + (a._count?.Booking || 0);
      const bScore = (b._count?.Car || 0) + (b._count?.Booking || 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  const stats = [
    {
      title: "Total Providers",
      value: totalProviders,
      color: "blue",
      icon: <IconBuilding size="1.5rem" />,
    },
    {
      title: "Active Providers",
      value: activeProviders,
      color: "green",
      icon: <IconUsers size="1.5rem" />,
    },
    {
      title: "Inactive Providers",
      value: inactiveProviders,
      color: "red",
      icon: <IconUsers size="1.5rem" />,
    },
    {
      title: "Providers with Cars",
      value: providersWithCars,
      color: "orange",
      icon: <IconCar size="1.5rem" />,
    },
  ];

  const activityStats = [
    {
      title: "Providers with Bookings",
      value: providersWithBookings,
      color: "blue",
    },
    {
      title: "Providers with Reviews",
      value: providersWithReviews,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Statistics */}
      <Grid>
        {stats.map((stat, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder p="md">
              <Group justify="space-between" mb="xs">
                <div>
                  <Text size="lg" fw={700} c={stat.color}>
                    {stat.value}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {stat.title}
                  </Text>
                </div>
                <div style={{ color: `var(--mantine-color-${stat.color}-6)` }}>
                  {stat.icon}
                </div>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Activity Statistics */}
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Activity Statistics
        </Text>
        <Grid>
          {activityStats.map((stat, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
              <div className="text-center">
                <Text size="xl" fw={700} c={stat.color}>
                  {stat.value}
                </Text>
                <Text size="sm" c="dimmed">
                  {stat.title}
                </Text>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      {/* Top Active Providers */}
      {topActiveProviders.length > 0 && (
        <Card withBorder p="md">
          <Text size="lg" fw={600} mb="md">
            Top Active Providers
          </Text>
          <div className="space-y-2">
            {topActiveProviders.map((provider, index) => (
              <Group key={provider.id} justify="space-between" p="xs" className="bg-gray-50 rounded">
                <div>
                  <Text size="sm" fw={500}>
                    {provider.companyName}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {provider.contactPhone} • {provider.email}
                  </Text>
                </div>
                <Group gap="xs">
                  <Badge size="xs" color="blue">
                    {provider._count?.Car || 0} Cars
                  </Badge>
                  <Badge size="xs" color="green">
                    {provider._count?.Booking || 0} Bookings
                  </Badge>
                  <Badge size="xs" color={provider.active ? "green" : "red"}>
                    {provider.active ? "Active" : "Inactive"}
                  </Badge>
                </Group>
              </Group>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}