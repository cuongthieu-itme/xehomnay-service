"use client";
import { deleteUser, updateUserStatus, updateUserRole } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { ActionIcon, Table, Button, Group, Select, Badge } from "@mantine/core";
import { IconTrash, IconEdit, IconEye, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiDislike, BiLike } from "react-icons/bi";
import { ConfirmationModal } from "../provider/ConfirmationModal";
import { useState } from "react";
import UserDetails from "./UserDetails";

export default function UserList({ users }: any) {
  const { refresh } = useRouter();
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");



  const handleUserStatus = async (id: string, status: string) => {
    const res = await updateUserStatus(id, status);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "User status updated successfully");
    }
  };

  const handleUserRole = async (id: string, role: string) => {
    const res = await updateUserRole(id, role);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "User role updated successfully");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteUser(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "User deleted successfully");
    }
  };

      const handleViewDetails = (id: string) => {
      setSelectedUserId(id);
      setDetailsModalOpened(true);
    };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'red';
      case 'provider':
        return 'blue';
      case 'user':
        return 'green';
      default:
        return 'gray';
    }
  };

  const rows = users?.map((user: any, i: number) => (
    <Table.Tr key={user.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>
        <div className="flex items-center gap-2">
          {user.image && (
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          )}
          <div>
            <div className="font-medium">{user.name || 'N/A'}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </Table.Td>
      <Table.Td>
        <Badge color={getRoleColor(user.role)} variant="light">
          {user.role}
        </Badge>
      </Table.Td>
      <Table.Td>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      </Table.Td>
      <Table.Td>
        <div className="text-sm">
          <div>Bookings: {user._count.Booking}</div>
          <div>Reviews: {user._count.Review}</div>
          {user.role === 'provider' && (
            <div>Provider Accounts: {user._count.Provider}</div>
          )}
        </div>
      </Table.Td>
      <Table.Td>{formatDate(user.createdAt)}</Table.Td>
      <Table.Td className="flex gap-1">
        <ActionIcon
          color="blue"
          onClick={() => handleViewDetails(user.id)}
          title="View Details"
        >
          <IconEye size="1.2rem" />
        </ActionIcon>

        <Select
          size="xs"
          w={80}
          value={user.role}
          onChange={(value) => value && handleUserRole(user.id, value)}
          data={[
            { value: 'user', label: 'User' },
            { value: 'provider', label: 'Provider' },
            { value: 'admin', label: 'Admin' },
          ]}
          disabled={user.role === 'admin'}
          title="Change Role"
        />

        {user.status === "active" ? (
          <ActionIcon
            color="green"
            onClick={() => handleUserStatus(user.id, "inactive")}
            title="Deactivate"
          >
            <BiLike size="1.2rem" />
          </ActionIcon>
        ) : (
          <ActionIcon
            color="red"
            onClick={() => handleUserStatus(user.id, "active")}
            title="Activate"
          >
            <BiDislike size="1.2rem" />
          </ActionIcon>
        )}

        <ConfirmationModal
          name={user.name || user.email}
          onConfirm={() => handleDelete(user.id)}
          openButton={
            <ActionIcon
              color="red"
              title="Delete User"
              disabled={user.role === 'admin'}
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-center font-semibold text-xl py-2">
          All Users List - ( {users?.length || 0} )
        </h1>
      </div>

      {users && users.length > 0 ? (
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
                <Table.Th>User</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Activity</Table.Th>
                <Table.Th>CreatedAt</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No users found.
        </div>
      )}

      {/* Modals */}
      <UserDetails
        opened={detailsModalOpened}
        onClose={() => setDetailsModalOpened(false)}
        userId={selectedUserId}
      />
    </>
  );
}