"use client";
import { deleteRegion, updateRegionStatus } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { ActionIcon, Table, Button, Group } from "@mantine/core";
import { IconTrash, IconEdit, IconEye, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiDislike, BiLike } from "react-icons/bi";
import { ConfirmationModal } from "../provider/ConfirmationModal";
import { useState } from "react";
import AddRegion from "./AddRegion";
import EditRegion from "./EditRegion";
import RegionDetails from "./RegionDetails";

export default function RegionList({ regions }: any) {
  const { refresh } = useRouter();
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState("");

  const handleStatus = async (id: string, status: string) => {
    const res = await updateRegionStatus(id, status);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Status updated successfully");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteRegion(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Region deleted successfully");
    }
  };

  const handleEdit = (id: string) => {
    setSelectedRegionId(id);
    setEditModalOpened(true);
  };

  const handleViewDetails = (id: string) => {
    setSelectedRegionId(id);
    setDetailsModalOpened(true);
  };

  const rows = regions?.map((p: any, i: number) => (
    <Table.Tr key={p.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{p.name}</Table.Td>
      <Table.Td>{p.country.name}</Table.Td>
      <Table.Td>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            p.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {p.status}
        </span>
      </Table.Td>
      <Table.Td>{formatDate(p.createdAt)}</Table.Td>
      <Table.Td className="flex gap-1">
        <ActionIcon
          color="blue"
          onClick={() => handleViewDetails(p.id)}
          title="View Details"
        >
          <IconEye size="1.2rem" />
        </ActionIcon>

        <ActionIcon
          color="orange"
          onClick={() => handleEdit(p.id)}
          title="Edit Region"
        >
          <IconEdit size="1.2rem" />
        </ActionIcon>

        {p.status === "active" ? (
          <ActionIcon
            color="green"
            onClick={() => handleStatus(p.id, "inactive")}
            title="Deactivate"
          >
            <BiLike size="1.2rem" />
          </ActionIcon>
        ) : (
          <ActionIcon
            color="red"
            onClick={() => handleStatus(p.id, "active")}
            title="Activate"
          >
            <BiDislike size="1.2rem" />
          </ActionIcon>
        )}

        <ConfirmationModal
          name={p.name}
          onConfirm={() => handleDelete(p.id)}
          openButton={
            <ActionIcon color="red" title="Delete Region">
              <IconTrash size="1.2rem" />
            </ActionIcon>
          }
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-center font-semibold text-xl py-2">
          All Region List - ( {regions?.length || 0} )
        </h1>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setAddModalOpened(true)}
          color="blue"
        >
          Add Region
        </Button>
      </div>

      {regions && regions.length > 0 ? (
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
                <Table.Th>S.N</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Country Name</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>CreatedAt</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No regions found. Please add a country first to see regions.
        </div>
      )}

      {/* Modals */}
      <AddRegion
        opened={addModalOpened}
        onClose={() => setAddModalOpened(false)}
      />

      <EditRegion
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        regionId={selectedRegionId}
      />

      <RegionDetails
        opened={detailsModalOpened}
        onClose={() => setDetailsModalOpened(false)}
        regionId={selectedRegionId}
      />
    </>
  );
}
