"use client";
import { Card, Text, Group, Badge, Button, Modal, Stack, Grid, ActionIcon } from "@mantine/core";
import { IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { ConfirmationModal } from "../provider/ConfirmationModal";
import { formatDate } from "@/lib/utils";

interface UserProviderAccountsProps {
  providers: any[];
  userId: string;
  onRefresh: () => void;
}

export default function UserProviderAccounts({ providers, userId, onRefresh }: UserProviderAccountsProps) {
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState("");

  const handleViewDetails = (id: string) => {
    setSelectedProviderId(id);
    setDetailsModalOpened(true);
  };

  const handleDelete = async (id: string) => {
    // Implement delete provider logic
    console.log('Delete provider:', id);
    onRefresh();
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'green' : 'red';
  };

  if (!providers || providers.length === 0) {
    return (
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Provider Accounts
        </Text>
        <Text c="dimmed" ta="center">
          No provider accounts found
        </Text>
      </Card>
    );
  }

  return (
    <>
      <Card withBorder p="md">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>
            Provider Accounts ({providers.length})
          </Text>
          <Button size="sm" leftSection={<IconPlus size="1rem" />}>
            Add Provider Account
          </Button>
        </Group>

        <div className="space-y-3">
          {providers.map((provider) => (
            <Card key={provider.id} withBorder p="md">
              <Group justify="space-between" mb="xs">
                <div>
                  <Text fw={500} size="sm">{provider.companyName}</Text>
                  <Text size="xs" c="dimmed">
                    {provider.contactPhone} • {provider.email}
                  </Text>
                </div>
                <Group gap="xs">
                  <Badge color={getStatusColor(provider.active)} variant="light" size="sm">
                    {provider.active ? 'Active' : 'Inactive'}
                  </Badge>
                  <ActionIcon
                    color="blue"
                    onClick={() => handleViewDetails(provider.id)}
                    title="View Details"
                  >
                    <IconEye size="1rem" />
                  </ActionIcon>
                  <ActionIcon
                    color="orange"
                    title="Edit Provider"
                  >
                    <IconEdit size="1rem" />
                  </ActionIcon>
                  <ConfirmationModal
                    name={provider.companyName}
                    onConfirm={() => handleDelete(provider.id)}
                    openButton={
                      <ActionIcon
                        color="red"
                        title="Delete Provider"
                      >
                        <IconTrash size="1rem" />
                      </ActionIcon>
                    }
                  />
                </Group>
              </Group>

              <Group gap="xs" mb="xs">
                <Badge size="xs" color="blue">
                  {provider._count?.Car || 0} Cars
                </Badge>
                <Badge size="xs" color="green">
                  {provider._count?.Booking || 0} Bookings
                </Badge>
                <Badge size="xs" color="orange">
                  {provider._count?.Review || 0} Reviews
                </Badge>
              </Group>

              <Text size="xs" c="dimmed">
                Business Reg: {provider.businessReg}
              </Text>
              <Text size="xs" c="dimmed">
                Location: {provider.city}, {provider.region?.name}, {provider.country?.name}
              </Text>
              <Text size="xs" c="dimmed">
                Created: {formatDate(provider.createdAt)}
              </Text>
            </Card>
          ))}
        </div>
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

// Provider Details Component (reuse from ProviderList)
function ProviderDetails({ providerId }: { providerId: string }) {
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Reuse the same logic from ProviderList
  // This would need to be implemented with getProviderById
  return (
    <div className="text-center py-8">
      <Text>Provider Details for ID: {providerId}</Text>
      <Text size="sm" c="dimmed">Details implementation needed</Text>
    </div>
  );
}