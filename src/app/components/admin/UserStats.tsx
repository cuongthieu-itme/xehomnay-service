"use client";
import { Card, Text, Group, Badge, Stack } from "@mantine/core";
import { IconUsers, IconUserCheck, IconUserX, IconCrown } from "@tabler/icons-react";

interface UserStatsProps {
  users: any[];
}

export default function UserStats({ users }: UserStatsProps) {
  if (!users || users.length === 0) {
    return null;
  }

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;

  // Role statistics
  const adminUsers = users.filter(user => user.role === 'admin').length;
  const providerUsers = users.filter(user => user.role === 'provider').length;
  const regularUsers = users.filter(user => user.role === 'user').length;

  // Activity statistics
  const usersWithBookings = users.filter(user => user._count.Booking > 0).length;
  const usersWithReviews = users.filter(user => user._count.Review > 0).length;
  const usersWithProviderAccounts = users.filter(user => user.role === 'provider' && user._count.Provider > 0).length;

  // Email verification statistics
  const verifiedUsers = users.filter(user => user.emailVerified).length;
  const unverifiedUsers = users.filter(user => !user.emailVerified).length;

  // Top active users (by bookings)
  const topActiveUsers = users
    .filter(user => user._count.Booking > 0)
    .sort((a, b) => b._count.Booking - a._count.Booking)
    .slice(0, 3);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <IconUsers size="1.5rem" />,
      color: "blue",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: <IconUserCheck size="1.5rem" />,
      color: "green",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: <IconUserX size="1.5rem" />,
      color: "red",
    },
    {
      title: "Admin Users",
      value: adminUsers,
      icon: <IconCrown size="1.5rem" />,
      color: "red",
    },
  ];

  const roleStats = [
    {
      title: "Regular Users",
      value: regularUsers,
      color: "green",
    },
    {
      title: "Providers",
      value: providerUsers,
      color: "blue",
    },
    {
      title: "Admins",
      value: adminUsers,
      color: "red",
    },
  ];

  const activityStats = [
    {
      title: "Users with Bookings",
      value: usersWithBookings,
      color: "blue",
    },
    {
      title: "Users with Reviews",
      value: usersWithReviews,
      color: "orange",
    },
    {
      title: "Users with Provider Accounts",
      value: usersWithProviderAccounts,
      color: "green",
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">User Statistics</h2>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} withBorder p="md">
            <Group justify="space-between">
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
        ))}
      </div>

      {/* Role Distribution */}
      <Card withBorder p="md" className="mb-4">
        <Text size="lg" fw={600} mb="md">
          Role Distribution
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roleStats.map((stat, index) => (
            <div key={index} className="text-center">
              <Text size="xl" fw={700} c={stat.color}>
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed">
                {stat.title}
              </Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Stats */}
      <Card withBorder p="md" className="mb-4">
        <Text size="lg" fw={600} mb="md">
          User Activity
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activityStats.map((stat, index) => (
            <div key={index} className="text-center">
              <Text size="xl" fw={700} c={stat.color}>
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed">
                {stat.title}
              </Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Email Verification Stats */}
      <Card withBorder p="md" className="mb-4">
        <Text size="lg" fw={600} mb="md">
          Email Verification
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center">
            <Text size="xl" fw={700} c="green">
              {verifiedUsers}
            </Text>
            <Text size="sm" c="dimmed">
              Verified Users
            </Text>
          </div>
          <div className="text-center">
            <Text size="xl" fw={700} c="orange">
              {unverifiedUsers}
            </Text>
            <Text size="sm" c="dimmed">
              Unverified Users
            </Text>
          </div>
        </div>
      </Card>

      {/* Top Active Users */}
      {topActiveUsers.length > 0 && (
        <Card withBorder p="md">
          <Text size="lg" fw={600} mb="md">
            Top Active Users (by Bookings)
          </Text>
          <Stack gap="sm">
            {topActiveUsers.map((user, index) => (
              <div key={user.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Badge color="blue" variant="light">
                    #{index + 1}
                  </Badge>
                  <div>
                    <Text size="sm" fw={500}>
                      {user.name || user.email}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {user.email}
                    </Text>
                  </div>
                </div>
                <div className="text-right">
                  <Text size="sm" fw={600} c="blue">
                    {user._count.Booking} bookings
                  </Text>
                  <Text size="xs" c="dimmed">
                    {user._count.Review} reviews
                  </Text>
                </div>
              </div>
            ))}
          </Stack>
        </Card>
      )}
    </div>
  );
}