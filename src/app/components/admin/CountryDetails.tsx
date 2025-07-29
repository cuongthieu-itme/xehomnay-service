"use client";
import { getCountryById } from "@/actions/admin";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Modal, Text, Group, Badge, Stack, Divider } from "@mantine/core";
import { IconMapPin, IconCalendar, IconCode } from "@tabler/icons-react";
import { formatDate } from "@/lib/utils";

interface CountryDetailsProps {
  opened: boolean;
  onClose: () => void;
  countryId: string;
}

export default function CountryDetails({ opened, onClose, countryId }: CountryDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState<any>(null);

  // Fetch country data when modal opens
  useEffect(() => {
    if (opened && countryId) {
      fetchCountryData();
    }
  }, [opened, countryId]);

  const fetchCountryData = async () => {
    setLoading(true);
    try {
      const result = await getCountryById(countryId);
      if (result && !result.error) {
        setCountryData(result);
      } else {
        toast.error("Failed to fetch country data");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to fetch country data");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Country Details"
      size="md"
      centered
    >
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : countryData ? (
        <div className="space-y-4">
          <div className="text-center">
            <Text size="xl" fw={600} className="mb-2">
              {countryData.name}
            </Text>
            <Badge
              color={countryData.status === "active" ? "green" : "red"}
              size="lg"
            >
              {countryData.status}
            </Badge>
          </div>

          <Divider />

          <Stack gap="md">
            <Group>
              <IconCode size={20} className="text-gray-500" />
              <div>
                <Text size="sm" c="dimmed">Country Code</Text>
                <Text fw={500}>{countryData.code || "N/A"}</Text>
              </div>
            </Group>

            {countryData.longitude && countryData.latitude && (
              <Group>
                <IconMapPin size={20} className="text-gray-500" />
                <div>
                  <Text size="sm" c="dimmed">Coordinates</Text>
                  <Text fw={500}>
                    {countryData.latitude.toFixed(6)}, {countryData.longitude.toFixed(6)}
                  </Text>
                </div>
              </Group>
            )}

            <Group>
              <IconCalendar size={20} className="text-gray-500" />
              <div>
                <Text size="sm" c="dimmed">Created At</Text>
                <Text fw={500}>{formatDate(countryData.createdAt)}</Text>
              </div>
            </Group>

            {countryData.updatedAt && countryData.updatedAt !== countryData.createdAt && (
              <Group>
                <IconCalendar size={20} className="text-gray-500" />
                <div>
                  <Text size="sm" c="dimmed">Last Updated</Text>
                  <Text fw={500}>{formatDate(countryData.updatedAt)}</Text>
                </div>
              </Group>
            )}
          </Stack>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No country data found
        </div>
      )}
    </Modal>
  );
}