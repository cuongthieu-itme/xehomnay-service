"use client";
import { getUserDetailsById } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import {
  Modal,
  Text,
  Group,
  Badge,
  Stack,
  Divider,
  Avatar,
  Card,
  Grid,
} from "@mantine/core";
import { IconUser, IconMail, IconCalendar, IconPhone, IconMapPin } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface UserDetailsProps {
  opened: boolean;
  onClose: () => void;
  userId: string;
}

export default function UserDetails({
  opened,
  onClose,
  userId,
}: UserDetailsProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (opened && userId) {
      fetchUserDetails();
    }
  }, [opened, userId]);

  const fetchUserDetails = async () => {
    setLoading(true);
    setUser(null);
    try {
      const result = await getUserDetailsById(userId);
      if (result && !result.error) {
        setUser(result);
      } else {
        console.error('Failed to get user details:', result?.error);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'red';
      case 'provider':
        return 'blue';
      case 'user':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'green' : 'red';
  };

  if (loading) {
    return (
      <Modal opened={opened} onClose={onClose} title="User Details" size="lg">
        <div className="text-center py-8">Loading...</div>
      </Modal>
    );
  }

  if (!user) {
    return (
      <Modal opened={opened} onClose={onClose} title="User Details" size="lg">
        <div className="text-center py-8 text-gray-500">
          User not found
        </div>
      </Modal>
    );
  }

  return (
    <Modal opened={opened} onClose={onClose} title="User Details" size="lg">
      <Stack gap="md">
        {/* User Basic Info */}
        <Card withBorder p="md">
          <Group>
            <Avatar src={user.image} size="lg" radius="xl" />
            <div>
              <Text size="lg" fw={600}>
                {user.name || 'N/A'}
              </Text>
              <Text size="sm" c="dimmed">
                {user.email}
              </Text>
              <Group gap="xs" mt="xs">
                <Badge color={getRoleColor(user.role)} variant="light">
                  {user.role}
                </Badge>
                <Badge color={getStatusColor(user.status)} variant="light">
                  {user.status}
                </Badge>
              </Group>
            </div>
          </Group>
        </Card>

        {/* User Profile */}
        {user.userProfile && (
          <Card withBorder p="md">
            <Text size="lg" fw={600} mb="md">
              Profile Information
            </Text>
            <Grid>
              <Grid.Col span={6}>
                <Group gap="xs">
                  <IconPhone size={16} />
                  <Text size="sm">
                    Phone: {user.userProfile.phone || 'N/A'}
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group gap="xs">
                  <IconCalendar size={16} />
                  <Text size="sm">
                    DOB: {user.userProfile.dob ? formatDate(user.userProfile.dob) : 'N/A'}
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group gap="xs">
                  <IconUser size={16} />
                  <Text size="sm">
                    Gender: {user.userProfile.gender || 'N/A'}
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group gap="xs">
                  <IconMapPin size={16} />
                  <Text size="sm">
                    City: {user.userProfile.city || 'N/A'}
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group gap="xs">
                  <IconMapPin size={16} />
                  <Text size="sm">
                    State: {user.userProfile.state || 'N/A'}
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>
        )}

        {/* Provider Information */}
        {user.Provider && user.Provider.length > 0 && (
          <Card withBorder p="md">
            <Text size="lg" fw={600} mb="md">
              Provider Information
            </Text>
            {user.Provider.map((provider: any, index: number) => (
              <div key={provider.id}>
                <Group justify="space-between">
                  <Text fw={500}>{provider.companyName}</Text>
                  <Badge color={provider.active ? 'green' : 'red'} variant="light">
                    {provider.active ? 'Active' : 'Inactive'}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  {provider.contactPhone} • {provider.email}
                </Text>
                <Text size="sm" c="dimmed">
                  Business Reg: {provider.businessReg}
                </Text>
                {index < user.Provider.length - 1 && <Divider my="sm" />}
              </div>
            ))}
          </Card>
        )}

        {/* Activity Summary */}
        <Card withBorder p="md">
          <Text size="lg" fw={600} mb="md">
            Activity Summary
          </Text>
          <Grid>
            <Grid.Col span={user.role === 'provider' ? 4 : 6}>
              <div className="text-center">
                <Text size="xl" fw={700} c="blue">
                  {user.Booking?.length || 0}
                </Text>
                <Text size="sm" c="dimmed">
                  Bookings
                </Text>
              </div>
            </Grid.Col>
            <Grid.Col span={user.role === 'provider' ? 4 : 6}>
              <div className="text-center">
                <Text size="xl" fw={700} c="orange">
                  {user.Review?.length || 0}
                </Text>
                <Text size="sm" c="dimmed">
                  Reviews
                </Text>
              </div>
            </Grid.Col>
            {user.role === 'provider' && (
              <Grid.Col span={4}>
                <div className="text-center">
                  <Text size="xl" fw={700} c="green">
                    {user.Provider?.length || 0}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Provider Accounts
                  </Text>
                </div>
              </Grid.Col>
            )}
          </Grid>
        </Card>

        {/* Recent Activity */}
        {(user.Booking?.length > 0 || user.Review?.length > 0) && (
          <Card withBorder p="md">
            <Text size="lg" fw={600} mb="md">
              Recent Activity
            </Text>

            {user.Booking?.length > 0 && (
              <div className="mb-4">
                <Text size="sm" fw={500} mb="xs">
                  Recent Bookings
                </Text>
                {user.Booking.slice(0, 3).map((booking: any) => (
                  <div key={booking.id} className="mb-2 p-2 bg-gray-50 rounded">
                    <Group justify="space-between">
                      <Text size="sm">Booking #{booking.id.slice(-6)}</Text>
                      <Badge color={booking.status === 'confirmed' ? 'green' : 'yellow'} size="xs">
                        {booking.status}
                      </Badge>
                    </Group>
                    <Text size="xs" c="dimmed">
                      {formatDate(booking.createdAt)}
                    </Text>
                  </div>
                ))}
              </div>
            )}

            {user.Review?.length > 0 && (
              <div>
                <Text size="sm" fw={500} mb="xs">
                  Recent Reviews
                </Text>
                {user.Review.slice(0, 3).map((review: any) => (
                  <div key={review.id} className="mb-2 p-2 bg-gray-50 rounded">
                    <Group justify="space-between">
                      <Text size="sm">Rating: {review.rate}/5</Text>
                      <Text size="xs" c="dimmed">
                        {formatDate(review.createdAt)}
                      </Text>
                    </Group>
                    {review.comment && (
                      <Text size="xs" c="dimmed" mt="xs">
                        &ldquo;{review.comment}&rdquo;
                      </Text>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Account Information */}
        <Card withBorder p="md">
          <Text size="lg" fw={600} mb="md">
            Account Information
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">
                Email Verified
              </Text>
              <Text size="sm">
                {user.emailVerified ? 'Yes' : 'No'}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">
                Member Since
              </Text>
              <Text size="sm">
                {formatDate(user.createdAt)}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">
                Last Updated
              </Text>
              <Text size="sm">
                {formatDate(user.updatedAt)}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">
                User ID
              </Text>
              <Text size="sm" style={{ fontFamily: 'monospace' }}>
                {user.id}
              </Text>
            </Grid.Col>
          </Grid>
        </Card>
      </Stack>
    </Modal>
  );
}