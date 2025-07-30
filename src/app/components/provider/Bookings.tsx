"use client";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Loader,
  Menu,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconProgressCheck,
  IconSquareRoundedXFilled,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { BookingStatus, IResBookingProps } from "../../../../types";

import {
  getProviderBookingDetails,
  updateProviderBookingStatus,
} from "@/actions/auth";
import { ghCurrency } from "@/const";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import { StatusRenderer } from "../StatusRenderer";

const header = (
  <Table.Tr>
    <Table.Th>Date Booked</Table.Th>
    <Table.Th>User</Table.Th>
    <Table.Th>Pickup Date</Table.Th>
    <Table.Th>Return Date</Table.Th>
    <Table.Th>Price</Table.Th>
    <Table.Th>Status</Table.Th>
  </Table.Tr>
);
export default function Bookings({ providerId }: { providerId: string }) {
  const [bookings, setBookings] = useState<IResBookingProps[]>([]);
  const searchParams = useSearchParams();
  const carId = searchParams.get("car_id") || "";

  const rows = bookings?.map((item: any) => (
    <TableRow
      key={item.id}
      bookingId={item.id}
      providerId={providerId}
      carId={carId}
      dateBooked={new Date(item.createdAt)}
      user={item.user}
      pickupDate={new Date(item.pickUpDate)}
      returnDate={new Date(item.returnDate)}
      price={item.totalPrice}
      status={item.status as BookingStatus}
    />
  ));
  useEffect(() => {
    const fetchBookings = async () => {
      if (carId && providerId) {
        //server call to get bookings
        const res = await getProviderBookingDetails(providerId, carId);
        if (res) {
          setBookings(res);
        }
      }
    };

    fetchBookings();
  }, [carId, providerId]);
  return bookings.length > 0 ? (
    <Card my="3rem">
      <Divider
        my="lg"
        label={
          <Title order={4} className="text-default" mb="lg">
            Bookings for {bookings[0].cars?.make} {bookings[0].cars?.model} (
            {bookings.length})
          </Title>
        }
      />

      <Box mah="310px" style={{ overflowY: "auto" }}>
        <Table striped highlightOnHover>
          <Table.Thead>{header}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Card>
  ) : (
    carId && (
      <Card my="3rem">
        <Text fs="italic" ta="center">
          Không có đơn đặt xe
        </Text>
      </Card>
    )
  );
}

const bookingActions: {
  display: string;
  value: "approve" | "reject";
  color: string;
  icon: ReactNode;
}[] = [
  {
    display: "Approve",
    value: "approve",
    color: "green",
    icon: <IconProgressCheck size={14} />,
  },
  {
    display: "Reject",
    value: "reject",
    color: "red",
    icon: <IconSquareRoundedXFilled size={14} />,
  },
];
interface TableRowProps {
  bookingId: string;
  carId: string;
  providerId: string;
  dateBooked: Date;
  user: {
    name: string;
    firstName: string;
    lastName: string;
    avatar: string;
    image: any;
  };
  pickupDate: Date;
  returnDate: Date;
  price: number;
  status: BookingStatus;
}

export const TableRow = ({
  bookingId,
  carId,
  providerId,
  dateBooked,
  user,
  pickupDate,
  returnDate,
  price,
  status,
}: TableRowProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { refresh } = useRouter();

  const handleUpdateBooking = async (value: "approve" | "reject") => {
    setIsUpdating(true);
    //server call to update booking status and car status

    const res = await updateProviderBookingStatus(bookingId, carId, value);

    if (res?.status === "success") {
      setIsUpdating(false);
      refresh();
      console.log("res", res);
      toast.success("Booking status updated successfully");
    } else {
      setIsUpdating(false);
      toast.error("Failed to update booking status");
    }
  };

  return (
    <Table.Tr>
      <Table.Td>{formatDate(dateBooked)}</Table.Td>
      <Table.Td>
        <Flex align="center" gap={4}>
          <Avatar size="sm" radius="xl" src={user?.avatar || user?.image} />
          <Text>{user?.name}</Text>
        </Flex>
      </Table.Td>
      <Table.Td>{formatDate(pickupDate)}</Table.Td>
      <Table.Td>{formatDate(returnDate)}</Table.Td>
      <Table.Td>
        {ghCurrency} {price}
      </Table.Td>
      <Table.Td width="100px">
        {status === "pending" ? (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              {isUpdating ? (
                <Loader size="xs" />
              ) : (
                <UnstyledButton>
                  <StatusRenderer status={status} />
                </UnstyledButton>
              )}
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Take Action</Menu.Label>

              {bookingActions.map((item) => (
                <Menu.Item
                  key={item.value}
                  onClick={() => handleUpdateBooking(item.value)}
                  leftSection={item.icon}
                  color={item.color}
                >
                  {item.display}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        ) : (
          <StatusRenderer status={status} />
        )}
      </Table.Td>
    </Table.Tr>
  );
};
