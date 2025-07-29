"use client";

import { deleteProvider, updateStatus, getProviderById } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { ActionIcon, Table, Button, Group, Badge, Modal, Stack, Card, Text, Grid } from "@mantine/core";
import { IconTrash, IconEdit, IconEye, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiDislike, BiLike } from "react-icons/bi";
import { ConfirmationModal } from "../provider/ConfirmationModal";
import { useState, useEffect } from "react";

interface ProviderListProps {
  allProviders: any;
}

export default function ProviderList({ allProviders }: ProviderListProps) {
  const { refresh } = useRouter();
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState("");

  const handleStatus = async (
    id: string,
    active: string,
    userId: string,
    status: string
  ) => {
    const res = await updateStatus(id, active, userId, status);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Status updated successfully");
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedProviderId(id);
    setDetailsModalOpened(true);
  };

  const handleDelete = async (id: string, userId: string) => {
    const res = await deleteProvider(id, userId);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Provider deleted successfully");
    }
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'green' : 'red';
  };

  if (!allProviders || allProviders.length === 0) {
    return (
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Provider Management
        </Text>
        <Text c="dimmed" ta="center">
          No providers found
        </Text>
      </Card>
    );
  }

  const rows = allProviders?.map((provider: any, i: number) => (
    <Table.Tr key={provider.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>
        <div>
          <Text fw={500}>{provider.companyName}</Text>
          <Text size="xs" c="dimmed">
            {provider.contactName}
          </Text>
          {provider.User && (
            <Text size="xs" c="dimmed">
              User: {provider.User.name} ({provider.User.email})
            </Text>
          )}
        </div>
      </Table.Td>
      <Table.Td>{provider.contactPhone}</Table.Td>
      <Table.Td>{provider.email}</Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(provider.active)} variant="light">
          {provider.active ? 'Active' : 'Inactive'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <div className="text-sm">
          <div>Cars: {provider._count?.Car || 0}</div>
          <div>Bookings: {provider._count?.Booking || 0}</div>
          <div>Reviews: {provider._count?.Review || 0}</div>
        </div>
      </Table.Td>
      <Table.Td className="flex gap-1">
        <ActionIcon
          color="blue"
          onClick={() => handleViewDetails(provider.id)}
          title="View Details"
        >
          <IconEye size="1.2rem" />
        </ActionIcon>

        {provider.active === true ? (
          <ActionIcon
            color="green"
            onClick={() => handleStatus(provider.id, "false", provider.userId, "inactive")}
            title="Deactivate"
          >
            <BiLike size="1.2rem" />
          </ActionIcon>
        ) : (
          <ActionIcon
            color="red"
            onClick={() => handleStatus(provider.id, "true", provider.userId, "active")}
            title="Activate"
          >
            <BiDislike size="1.2rem" />
          </ActionIcon>
        )}

        <ConfirmationModal
          name={provider.companyName}
          onConfirm={() => handleDelete(provider.id, provider.userId)}
          openButton={
            <ActionIcon
              color="red"
              title="Delete Provider"
            >
              <IconTrash size="1.2rem" />
            </ActionIcon>
          }
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Card withBorder p="md">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>
            Provider Management
          </Text>
          <Text size="sm" c="dimmed">
            Total: {allProviders.length} providers
          </Text>
        </Group>

        <Table.ScrollContainer minWidth={500} type="native">
          <Table
            striped
            stickyHeader
            highlightOnHover
            withTableBorder
            withColumnBorders
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Company</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Activity</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      {/* Provider Details Modal */}
      <Modal
        opened={detailsModalOpened}
        onClose={() => setDetailsModalOpened(false)}
        title="Provider Details"
        size="lg"
      >
        {selectedProviderId && (
          <ProviderDetails providerId={selectedProviderId} />
        )}
      </Modal>
    </>
  );
}

// Provider Details Component
function ProviderDetails({ providerId }: { providerId: string }) {
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      setLoading(true);
      try {
        const result = await getProviderById(providerId);
        if (result && !result.error) {
          setProvider(result);
        } else {
          console.error('Failed to get provider details:', result?.error);
          setProvider(null);
        }
      } catch (error) {
        console.error("Error fetching provider details:", error);
        setProvider(null);
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      fetchProviderDetails();
    }
  }, [providerId]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!provider) {
    return <div className="text-center py-8 text-gray-500">Provider not found</div>;
  }

  return (
    <Stack gap="md">
      {/* Provider Basic Info */}
      <Card withBorder p="md">
        <Group>
          <div>
            <Text size="lg" fw={600}>
              {provider.companyName}
            </Text>
            <Text size="sm" c="dimmed">
              {provider.email}
            </Text>
            <Group gap="xs" mt="xs">
              <Badge color={provider.active ? 'green' : 'red'} variant="light">
                {provider.active ? 'Active' : 'Inactive'}
              </Badge>
            </Group>
          </div>
        </Group>
      </Card>

      {/* Provider Information */}
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Company Information
        </Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Contact Name</Text>
            <Text>{provider.contactName}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Phone</Text>
            <Text>{provider.contactPhone}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Business Registration</Text>
            <Text>{provider.businessReg}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Email</Text>
            <Text>{provider.email}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Country</Text>
            <Text>{provider.country?.name}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Region</Text>
            <Text>{provider.region?.name}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">City</Text>
            <Text>{provider.city}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Street</Text>
            <Text>{provider.street}</Text>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Activity Summary */}
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Activity Summary
        </Text>
        <Grid>
          <Grid.Col span={4}>
            <div className="text-center">
              <Text size="xl" fw={700} c="blue">
                {provider._count?.Car || 0}
              </Text>
              <Text size="sm" c="dimmed">
                Cars
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
            <div className="text-center">
              <Text size="xl" fw={700} c="green">
                {provider._count?.Booking || 0}
              </Text>
              <Text size="sm" c="dimmed">
                Bookings
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
            <div className="text-center">
              <Text size="xl" fw={700} c="orange">
                {provider._count?.Review || 0}
              </Text>
              <Text size="sm" c="dimmed">
                Reviews
              </Text>
            </div>
          </Grid.Col>
        </Grid>
      </Card>

      {/* User Information */}
      {provider.User && (
        <Card withBorder p="md">
          <Text size="lg" fw={600} mb="md">
            User Information
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">User Name</Text>
              <Text>{provider.User.name}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">User Email</Text>
              <Text>{provider.User.email}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">User Role</Text>
              <Text>{provider.User.role}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" c="dimmed">User Status</Text>
              <Text>{provider.User.status}</Text>
            </Grid.Col>
          </Grid>
        </Card>
      )}

      {/* Account Information */}
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Account Information
        </Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Provider ID</Text>
            <Text size="sm" style={{ fontFamily: 'monospace' }}>
              {provider.id}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Created At</Text>
            <Text size="sm">
              {formatDate(provider.createdAt)}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Last Updated</Text>
            <Text size="sm">
              {formatDate(provider.updatedAt)}
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Stack>
  );
}
