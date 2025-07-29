"use client";
import { getRegionById, updateRegion, getAllCountry } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Modal, TextInput, NumberInput, Select } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

interface EditRegionProps {
  opened: boolean;
  onClose: () => void;
  regionId: string;
}

export default function EditRegion({ opened, onClose, regionId }: EditRegionProps) {
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    countryId: "",
    longitude: null as number | null,
    latitude: null as number | null,
  });

  // Fetch region data and countries when modal opens
  useEffect(() => {
    if (opened && regionId) {
      fetchRegionData();
      fetchCountries();
    }
  }, [opened, regionId]);

  const fetchRegionData = async () => {
    setFetching(true);
    try {
      const result = await getRegionById(regionId);
      if (result && !result.error) {
        setFormData({
          name: result.name || "",
          countryId: result.countryId || "",
          longitude: result.longitude,
          latitude: result.latitude,
        });
      } else {
        toast.error("Failed to fetch region data");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to fetch region data");
      onClose();
    } finally {
      setFetching(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const result = await getAllCountry();
      if (result && !result.error) {
        setCountries(result);
      }
    } catch (error) {
      toast.error("Failed to fetch countries");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateRegion(regionId, {
        name: formData.name,
        countryId: formData.countryId,
        longitude: formData.longitude || undefined,
        latitude: formData.latitude || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "Region updated successfully");
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
      title="Edit Region"
      size="md"
      centered
    >
      {fetching ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Country"
            placeholder="Select a country"
            data={countries.map(country => ({
              value: country.id,
              label: country.name,
            }))}
            value={formData.countryId}
            onChange={(value) =>
              setFormData({ ...formData, countryId: value || "" })
            }
            required
            withAsterisk
          />

          <TextInput
            label="Region Name"
            placeholder="Enter region name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            withAsterisk
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
              Update Region
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}