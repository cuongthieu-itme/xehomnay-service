"use client";
import { deleteCountry, updateCountryStatus } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { ActionIcon, Table, Button, Group } from "@mantine/core";
import { IconTrash, IconEdit, IconEye, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiDislike, BiLike } from "react-icons/bi";
import { ConfirmationModal } from "../provider/ConfirmationModal";
import { useState } from "react";
import AddCountry from "./AddCountry";
import EditCountry from "./EditCountry";
import CountryDetails from "./CountryDetails";

export default function CountryList({ countries }: any) {
  const { refresh } = useRouter();
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState("");

  const handleCountryStatus = async (id: string, status: string) => {
    const res = await updateCountryStatus(id, status);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Country status updated successfully");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteCountry(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Country deleted successfully");
    }
  };

  const handleEdit = (id: string) => {
    setSelectedCountryId(id);
    setEditModalOpened(true);
  };

  const handleViewDetails = (id: string) => {
    setSelectedCountryId(id);
    setDetailsModalOpened(true);
  };

  const rows = countries?.map((p: any, i: number) => (
    <Table.Tr key={p.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{p.name}</Table.Td>
      <Table.Td>{p.code}</Table.Td>
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
          title="Edit Country"
        >
          <IconEdit size="1.2rem" />
        </ActionIcon>

        {p.status === "active" ? (
          <ActionIcon
            color="green"
            onClick={() => handleCountryStatus(p.id, "inactive")}
            title="Deactivate"
          >
            <BiLike size="1.2rem" />
          </ActionIcon>
        ) : (
          <ActionIcon
            color="red"
            onClick={() => handleCountryStatus(p.id, "active")}
            title="Activate"
          >
            <BiDislike size="1.2rem" />
          </ActionIcon>
        )}

        <ConfirmationModal
          name={p.name}
          onConfirm={() => handleDelete(p.id)}
          openButton={
            <ActionIcon color="red" title="Delete Country">
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
          All Country List - ( {countries?.length || 0} )
        </h1>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setAddModalOpened(true)}
          color="blue"
        >
          Add Country
        </Button>
      </div>

      {countries && countries.length > 0 ? (
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
                <Table.Th>Code</Table.Th>
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
          No countries found. Please add some countries first.
        </div>
      )}

      {/* Modals */}
      <AddCountry
        opened={addModalOpened}
        onClose={() => setAddModalOpened(false)}
      />

      <EditCountry
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        countryId={selectedCountryId}
      />

      <CountryDetails
        opened={detailsModalOpened}
        onClose={() => setDetailsModalOpened(false)}
        countryId={selectedCountryId}
      />
    </>
  );
}
