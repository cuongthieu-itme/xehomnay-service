"use client";

import { convertDate } from "@/lib/date";
import { convertPrice } from "@/lib/price";
import { formatTime } from "@/lib/utils";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Table,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StatusRenderer } from "../../StatusRenderer";

interface BookingsProps {
  userId: string;
  bookings: any[];
  car?: any;
}
const header = (
  <Table.Tr>
    <Table.Th>Ngày thuê</Table.Th>
    <Table.Th>Thời gian thuê</Table.Th>
    <Table.Th>Xe</Table.Th>
    <Table.Th>Ngày lấy xe</Table.Th>
    <Table.Th>Ngày trả xe</Table.Th>
    <Table.Th>Giá</Table.Th>
    <Table.Th>Trạng thái</Table.Th>
  </Table.Tr>
);
export default function Bookings({ userId, bookings }: BookingsProps) {
  const searchParams = useSearchParams();
  const carId = searchParams.get("car_id");

  const rows = bookings?.map((item) => (
    <TableRow
      key={item.id}
      bookingId={item.id}
      hOrday={item.hOrday}
      carId={carId}
      dateBooked={new Date(item.createdAt)}
      time={item.rentalTime}
      car={item.car as any}
      pickupDate={new Date(item.pickUpDate)}
      returnDate={new Date(item.returnDate)}
      price={item.totalPrice}
      status={item.status as any}
    />
  ));
  return bookings?.length > 0 ? (
    <>
      <Divider
        mb="lg"
        labelPosition="left"
        label={
          <Title order={1} className="text-default" mb="lg">
            Danh sách đơn đặt xe ({bookings.length})
          </Title>
        }
      />

      <Box mah="310px" style={{ overflowY: "auto" }}>
        <Table striped highlightOnHover>
          <Table.Thead>{header}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </>
  ) : (
    <Card my="3rem">
      <Text fs="italic" ta="center">
        Không có đơn đặt xe
      </Text>
    </Card>
  );
}

interface TableRowProps {
  bookingId: string;
  carId: string | null;
  dateBooked: Date;
  hOrday: string;
  time: string;
  car: { slug: string; make: string; model: string; images: any[] };
  pickupDate: Date;
  returnDate: Date;
  price: number;
  status: string;
}
export const TableRow = ({
  dateBooked,
  hOrday,
  time,
  car,
  pickupDate,
  returnDate,
  price,
  status,
}: TableRowProps) => {
  return (
    <Table.Tr>
      <Table.Td>{convertDate(dateBooked)}</Table.Td>
      <Table.Td>{formatTime(time)}</Table.Td>
      <Table.Td>
        <Flex align="center" gap={4}>
          <Avatar size="sm" radius="xl" src={car.images[0]?.imageUrl} />

          <Text component={Link} href={`/cars/${car.slug}`}>
            {car.make} {car.model}
          </Text>
        </Flex>
      </Table.Td>
      <Table.Td>{convertDate(pickupDate)}</Table.Td>
      <Table.Td>{convertDate(returnDate)}</Table.Td>
      <Table.Td>
       {convertPrice(price)} ({hOrday})
      </Table.Td>
      <Table.Td width="100px">
        <StatusRenderer status={status} />
      </Table.Td>
    </Table.Tr>
  );
};
