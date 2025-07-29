"use client";
import { Card, Text, Group, Badge, Grid } from "@mantine/core";
import { IconCalendar, IconCar, IconUser, IconCreditCard } from "@tabler/icons-react";

interface BookingStatsProps {
  bookings: any[];
}

export default function BookingStats({ bookings }: BookingStatsProps) {
  if (!bookings || bookings.length === 0) {
    return (
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Booking Statistics
        </Text>
        <Text c="dimmed" ta="center">
          No bookings found
        </Text>
      </Card>
    );
  }

  // Calculate statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;
  const approvedBookings = bookings.filter(booking => booking.status === 'approved').length;
  const rejectedBookings = bookings.filter(booking => booking.status === 'rejected').length;

  // Payment statistics
  const bookingsWithPayment = bookings.filter(booking => booking.Payment && booking.Payment.length > 0).length;
  const pendingPayments = bookings.filter(booking =>
    booking.Payment && booking.Payment.some((payment: any) => payment.status === 'pending')
  ).length;
  const completedPayments = bookings.filter(booking =>
    booking.Payment && booking.Payment.some((payment: any) => payment.status === 'completed')
  ).length;

  // Revenue statistics
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const approvedRevenue = bookings
    .filter(booking => booking.status === 'approved')
    .reduce((sum, booking) => sum + booking.totalPrice, 0);

  // Recent bookings (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentBookings = bookings.filter(booking =>
    new Date(booking.createdAt) > sevenDaysAgo
  ).length;

  // Top providers by bookings
  const providerStats = bookings.reduce((acc: any, booking) => {
    const providerName = booking.provider?.companyName || 'Unknown';
    acc[providerName] = (acc[providerName] || 0) + 1;
    return acc;
  }, {});

  const topProviders = Object.entries(providerStats)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 3);

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <IconCalendar size="1.5rem" />,
      color: "blue",
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      icon: <IconCalendar size="1.5rem" />,
      color: "yellow",
    },
    {
      title: "Approved Bookings",
      value: approvedBookings,
      icon: <IconCalendar size="1.5rem" />,
      color: "green",
    },
    {
      title: "Rejected Bookings",
      value: rejectedBookings,
      icon: <IconCalendar size="1.5rem" />,
      color: "red",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <IconCreditCard size="1.5rem" />,
      color: "green",
    },
  ];

  return (
    <Card withBorder p="md" mb="lg">
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Booking Statistics
        </Text>
        <Badge color="blue" variant="light">
          {totalBookings} Total Bookings
        </Badge>
      </Group>

      <Grid>
        {stats.map((stat, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder p="sm">
              <Group>
                <div style={{ color: `var(--mantine-color-${stat.color}-6)` }}>
                  {stat.icon}
                </div>
                <div>
                  <Text size="xs" c="dimmed">
                    {stat.title}
                  </Text>
                  <Text fw={700} size="lg">
                    {stat.value}
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Grid mt="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder p="sm">
            <Text size="sm" fw={500} mb="xs">
              Payment Statistics
            </Text>
            <Group gap="xs">
              <Badge color="blue" variant="light">
                {bookingsWithPayment} With Payment
              </Badge>
              <Badge color="yellow" variant="light">
                {pendingPayments} Pending
              </Badge>
              <Badge color="green" variant="light">
                {completedPayments} Completed
              </Badge>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder p="sm">
            <Text size="sm" fw={500} mb="xs">
              Recent Activity
            </Text>
            <Group gap="xs">
              <Badge color="blue" variant="light">
                {recentBookings} Last 7 Days
              </Badge>
              <Badge color="green" variant="light">
                ${approvedRevenue.toLocaleString()} Approved Revenue
              </Badge>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {topProviders.length > 0 && (
        <Card withBorder p="sm" mt="md">
          <Text size="sm" fw={500} mb="xs">
            Top Providers by Bookings
          </Text>
          <Group gap="xs">
            {topProviders.map(([providerName, count]: any, index) => (
              <Badge key={index} color={index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'} variant="light">
                {providerName}: {count}
              </Badge>
            ))}
          </Group>
        </Card>
      )}
    </Card>
  );
}