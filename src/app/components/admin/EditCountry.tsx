"use client";
import { getCountryById, updateCountry } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Modal, TextInput, NumberInput } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

interface EditCountryProps {
  opened: boolean;
  onClose: () => void;
  countryId: string;
}

export default function EditCountry({ opened, onClose, countryId }: EditCountryProps) {
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    longitude: null as number | null,
    latitude: null as number | null,
  });

  // Fetch country data when modal opens
  useEffect(() => {
    if (opened && countryId) {
      fetchCountryData();
    }
  }, [opened, countryId]);

  const fetchCountryData = async () => {
    setFetching(true);
    try {
      const result = await getCountryById(countryId);
      if (result && !result.error) {
        setFormData({
          name: result.name || "",
          code: result.code || "",
          longitude: result.longitude,
          latitude: result.latitude,
        });
      } else {
        toast.error("Failed to fetch country data");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to fetch country data");
      onClose();
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateCountry(countryId, {
        name: formData.name,
        code: formData.code || undefined,
        longitude: formData.longitude || undefined,
        latitude: formData.latitude || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "Country updated successfully");
        refresh();
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Country"
      size="md"
      centered
    >
      {fetching ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Country Name"
            placeholder="Enter country name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            withAsterisk
          />

          <TextInput
            label="Country Code"
            placeholder="e.g., VN, US, UK"
            value={formData.code}
            onChange={(e) =>
              setFormData({ ...formData, code: e.target.value })
            }
            maxLength={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Longitude"
              placeholder="e.g., 105.8342"
              value={formData.longitude || undefined}
              onChange={(value) =>
                setFormData({ ...formData, longitude: value as number | null })
              }
              decimalScale={6}
              min={-180}
              max={180}
            />

            <NumberInput
              label="Latitude"
              placeholder="e.g., 21.0278"
              value={formData.latitude || undefined}
              onChange={(value) =>
                setFormData({ ...formData, latitude: value as number | null })
              }
              decimalScale={6}
              min={-90}
              max={90}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Update Country
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}