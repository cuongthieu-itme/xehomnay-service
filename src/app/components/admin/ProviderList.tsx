"use client";

import { deleteProvider, updateStatus } from "@/actions/admin";
import { ActionIcon, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiDislike, BiLike } from "react-icons/bi";
import { ConfirmationModal } from "../provider/ConfirmationModal";

interface ProviderListProps {
  allProviders: any;
}

export default function ProviderList({ allProviders }: ProviderListProps) {
  const { refresh } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

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

  const openModal = (provider: any) => {
    setSelectedProvider(provider);
    open();
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

  const rows = allProviders?.map((p: any, i: number) => (
    <Table.Tr key={p.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{p.companyName}</Table.Td>
      <Table.Td>{p.contactPhone}</Table.Td>
      <Table.Td>{p.email}</Table.Td>
      <Table.Td>{p.businessReg}</Table.Td>
      <Table.Td className="flex gap-1">
        {p.active === true ? (
          <ActionIcon
            color="green"
            onClick={() => handleStatus(p.id, "false", p.userId, "inactive")}
          >
            <BiLike size="1.2rem" />
          </ActionIcon>
        ) : (
          <ActionIcon
            color="red"
            onClick={() => handleStatus(p.id, "true", p.userId, "active")}
          >
            <BiDislike size="1.2rem" />
          </ActionIcon>
        )}

        <ActionIcon color="" onClick={() => openModal(p)}>
          <Eye size="1.2rem" />
        </ActionIcon>

        <ConfirmationModal
          name={p.companyName}
          onConfirm={() => handleDelete(p.id, p.userId)}
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
        Danh sách nhà cung cấp - ( {allProviders.length} )
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
              <Table.Th>Số điện thoại</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Đăng ký kinh doanh</Table.Th>
              <Table.Th>Thao tác</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {/* Modal view */}
      <Modal
        opened={opened}
        onClose={close}
        title="Provider Details View"
        centered
      >
        {selectedProvider ? (
          <div className="p-4">
            <p>
              <strong>Tên: </strong>
              {selectedProvider.companyName}
            </p>
            <p>
              <strong>Trạng thái: </strong>
              {selectedProvider.active ? "Có" : "Không"}
            </p>
            <p>
              <strong>Tên liên hệ: </strong>
              {selectedProvider.contactName}
            </p>
            <p>
              <strong>Số điện thoại: </strong>
              {selectedProvider.contactPhone}
            </p>
            <p>
              <strong>Email: </strong>
              {selectedProvider.email}
            </p>
            <p>
              <strong>Đăng ký kinh doanh: </strong>
              {selectedProvider.businessReg}
            </p>
            <p>
              <strong>Quốc gia: </strong>
              {selectedProvider.country.name}
            </p>
            <p>
              <strong>Khu vực: </strong>
              {selectedProvider.region.name}
            </p>
            <p>
              <strong>Thành phố: </strong>
              {selectedProvider.city}
            </p>
            <p>
              <strong>Địa chỉ: </strong>
              {selectedProvider.street}
            </p>
          </div>
        ) : (
          <p className="text-center">Đang tải...</p>
        )}
      </Modal>
    </>
  );
}
