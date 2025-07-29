"use client";
import { deleteRegion, updateRegionStatus } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { ActionIcon, Table } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiDislike, BiLike } from "react-icons/bi";
import { ConfirmationModal } from "../provider/ConfirmationModal";

export default function RegionList({ regions }: any) {
  const { refresh } = useRouter();

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

  const rows = regions?.map((p: any, i: number) => (
    <Table.Tr key={p.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{p.name}</Table.Td>
      <Table.Td>{p.country.name}</Table.Td>
      <Table.Td>{formatDate(p.createdAt)}</Table.Td>
      <Table.Td className="flex gap-1">
        {p.status === "active" ? (
          <ActionIcon
            color="green"
            onClick={() => handleStatus(p.id, "inactive")}
          >
            <BiLike size="1.2rem" />
          </ActionIcon>
        ) : (
          <ActionIcon color="red" onClick={() => handleStatus(p.id, "active")}>
            <BiDislike size="1.2rem" />
          </ActionIcon>
        )}

        <ConfirmationModal
          name={p.name}
          onConfirm={() => handleDelete(p.id)}
          openButton={
            <ActionIcon color="red">
              <IconTrash size="1.2rem" />
            </ActionIcon>
          }
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <h1 className="text-center font-semibold text-xl py-2">
        All Region List - ( {regions.length} )
      </h1>

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
              <Table.Th>STT</Table.Th>
              <Table.Th>Tên</Table.Th>
              <Table.Th>Quốc gia</Table.Th>
              <Table.Th>Ngày tạo</Table.Th>
              <Table.Th>Thao tác</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
