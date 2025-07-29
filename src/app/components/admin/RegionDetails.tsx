"use client";
import { getRegionById } from "@/actions/admin";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Modal, Text, Group, Badge, Stack, Divider } from "@mantine/core";
import { IconMapPin, IconCalendar, IconFlag } from "@tabler/icons-react";
import { formatDate } from "@/lib/utils";

interface RegionDetailsProps {
  opened: boolean;
  onClose: () => void;
  regionId: string;
}

export default function RegionDetails({ opened, onClose, regionId }: RegionDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [regionData, setRegionData] = useState<any>(null);

  // Fetch region data when modal opens
  useEffect(() => {
    if (opened && regionId) {
      fetchRegionData();
    }
  }, [opened, regionId]);

  const fetchRegionData = async () => {
    setLoading(true);
    try {
      const result = await getRegionById(regionId);
      if (result && !result.error) {
        setRegionData(result);
      } else {
        toast.error("Failed to fetch region data");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to fetch region data");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Region Details"
      size="md"
      centered
    >
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : regionData ? (
        <div className="space-y-4">
          <div className="text-center">
            <Text size="xl" fw={600} className="mb-2">
              {regionData.name}
            </Text>
            <Badge
              color={regionData.status === "active" ? "green" : "red"}
              size="lg"
            >
              {regionData.status}
            </Badge>
          </div>

          <Divider />

          <Stack gap="md">
            <Group>
              <IconFlag size={20} className="text-gray-500" />
              <div>
                <Text size="sm" c="dimmed">Country</Text>
                <Text fw={500}>{regionData.country?.name || "N/A"}</Text>
              </div>
            </Group>

            {regionData.longitude && regionData.latitude && (
              <Group>
                <IconMapPin size={20} className="text-gray-500" />
                <div>
                  <Text size="sm" c="dimmed">Coordinates</Text>
                  <Text fw={500}>
                    {regionData.latitude.toFixed(6)}, {regionData.longitude.toFixed(6)}
                  </Text>
                </div>
              </Group>
            )}

            <Group>
              <IconCalendar size={20} className="text-gray-500" />
              <div>
                <Text size="sm" c="dimmed">Created At</Text>
                <Text fw={500}>{formatDate(regionData.createdAt)}</Text>
              </div>
            </Group>

            {regionData.updatedAt && regionData.updatedAt !== regionData.createdAt && (
              <Group>
                <IconCalendar size={20} className="text-gray-500" />
                <div>
                  <Text size="sm" c="dimmed">Last Updated</Text>
                  <Text fw={500}>{formatDate(regionData.updatedAt)}</Text>
                </div>
              </Group>
            )}
          </Stack>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No region data found
        </div>
      )}
    </Modal>
  );
}