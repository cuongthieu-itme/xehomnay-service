"use client";
import { deleteBooking, updateBookingStatus, getBookingDetailsById } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { ActionIcon, Table, Button, Group, Badge, Modal, Stack, Card, Text, Grid, Select } from "@mantine/core";
import { IconTrash, IconEdit, IconEye, IconCalendar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ConfirmationModal } from "../provider/ConfirmationModal";
import { useState, useEffect } from "react";
import { ghCurrency } from "@/const";

interface BookingListProps {
  bookings: any[];
}

export default function BookingList({ bookings }: BookingListProps) {
  const { refresh } = useRouter();
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const handleStatus = async (id: string, status: string) => {
    const res = await updateBookingStatus(id, status);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Booking status updated successfully");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteBooking(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Booking deleted successfully");
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedBookingId(id);
    setDetailsModalOpened(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Booking Management
        </Text>
        <Text c="dimmed" ta="center">
          No bookings found
        </Text>
      </Card>
    );
  }

  const rows = bookings?.map((booking: any, i: number) => (
    <Table.Tr key={booking.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>
        <div>
          <Text fw={500} size="sm">{booking.user?.name || 'N/A'}</Text>
          <Text size="xs" c="dimmed">{booking.user?.email}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <div>
          <Text fw={500} size="sm">{booking.car?.make} {booking.car?.model}</Text>
          <Text size="xs" c="dimmed">{booking.car?.year}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <div>
          <Text fw={500} size="sm">{booking.provider?.companyName}</Text>
          <Text size="xs" c="dimmed">{booking.provider?.contactName}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <div>
          <Text size="sm">{formatDate(booking.pickUpDate)}</Text>
          <Text size="xs" c="dimmed">{booking.rentalTime}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <div>
          <Text size="sm">{formatDate(booking.returnDate)}</Text>
          <Text size="xs" c="dimmed">{booking.hOrday}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{ghCurrency} {booking.totalPrice}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(booking.status)} variant="light">
          {booking.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <div className="text-sm">
          <div>Payment: {booking.Payment?.length > 0 ? 'Yes' : 'No'}</div>
          <div>Created: {formatDate(booking.createdAt)}</div>
        </div>
      </Table.Td>
      <Table.Td className="flex gap-1">
        <ActionIcon color="blue" onClick={() => handleViewDetails(booking.id)} title="View Details">
          <IconEye size="1.2rem" />
        </ActionIcon>
        <Select
          size="xs"
          w={100}
          data={[
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
          ]}
          value={booking.status}
          onChange={(value) => value && handleStatus(booking.id, value)}
        />
        <ConfirmationModal
          name={`Booking #${booking.id.slice(-6)}`}
          onConfirm={() => handleDelete(booking.id)}
          openButton={
            <ActionIcon color="red" title="Delete Booking">
              <IconTrash size="1.2rem" />
            </ActionIcon>
          }
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Card withBorder p="md">
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>Booking Management</Text>
          <Text size="sm" c="dimmed">Total: {bookings.length} bookings</Text>
        </Group>
        <Table.ScrollContainer minWidth={500} type="native">
          <Table striped stickyHeader highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>User</Table.Th>
                <Table.Th>Car</Table.Th>
                <Table.Th>Provider</Table.Th>
                <Table.Th>Pickup</Table.Th>
                <Table.Th>Return</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Info</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      <Modal opened={detailsModalOpened} onClose={() => setDetailsModalOpened(false)} title="Booking Details" size="lg">
        {selectedBookingId && (<BookingDetails bookingId={selectedBookingId} />)}
      </Modal>
    </>
  );
}

// Booking Details Component
function BookingDetails({ bookingId }: { bookingId: string }) {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      try {
        const result = await getBookingDetailsById(bookingId);
        if (result && !result.error) {
          setBooking(result);
        } else {
          console.error('Failed to get booking details:', result?.error);
          setBooking(null);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  if (!booking) {
    return <div className="text-center py-8 text-gray-500">Booking not found</div>;
  }

  return (
    <Stack gap="md">
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">Booking Information</Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Booking ID</Text>
            <Text size="sm" style={{ fontFamily: 'monospace' }}>{booking.id}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Status</Text>
            <Badge color={booking.status === 'approved' ? 'green' : booking.status === 'pending' ? 'yellow' : 'red'} variant="light">
              {booking.status}
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Pickup Date</Text>
            <Text size="sm">{formatDate(booking.pickUpDate)}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Return Date</Text>
            <Text size="sm">{formatDate(booking.returnDate)}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Rental Time</Text>
            <Text size="sm">{booking.rentalTime}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Duration</Text>
            <Text size="sm">{booking.hOrday}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Total Price</Text>
            <Text size="sm" fw={500}>{ghCurrency} {booking.totalPrice}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Created At</Text>
            <Text size="sm">{formatDate(booking.createdAt)}</Text>
          </Grid.Col>
        </Grid>
      </Card>

      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">User Information</Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Name</Text>
            <Text size="sm">{booking.user?.name || 'N/A'}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Email</Text>
            <Text size="sm">{booking.user?.email}</Text>
          </Grid.Col>
          {booking.user?.userProfile && (
            <>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Phone</Text>
                <Text size="sm">{booking.user.userProfile.phone || 'N/A'}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Location</Text>
                <Text size="sm">{booking.user.userProfile.city}, {booking.user.userProfile.state}</Text>
              </Grid.Col>
            </>
          )}
        </Grid>
      </Card>

      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">Car Information</Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Make & Model</Text>
            <Text size="sm">{booking.car?.make} {booking.car?.model}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Year</Text>
            <Text size="sm">{booking.car?.year}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Color</Text>
            <Text size="sm">{booking.car?.color}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Fuel Type</Text>
            <Text size="sm">{booking.car?.fuelType}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Transmission</Text>
            <Text size="sm">{booking.car?.transmission}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Price Per Day</Text>
            <Text size="sm">{ghCurrency} {booking.car?.pricePerDay}</Text>
          </Grid.Col>
        </Grid>
      </Card>

      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">Provider Information</Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Company Name</Text>
            <Text size="sm">{booking.provider?.companyName}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Contact Name</Text>
            <Text size="sm">{booking.provider?.contactName}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Phone</Text>
            <Text size="sm">{booking.provider?.contactPhone}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Email</Text>
            <Text size="sm">{booking.provider?.email}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Location</Text>
            <Text size="sm">{booking.provider?.city}, {booking.provider?.street}</Text>
          </Grid.Col>
        </Grid>
      </Card>

      {booking.Payment && booking.Payment.length > 0 && (
        <Card withBorder p="md">
          <Text size="lg" fw={600} mb="md">Payment Information</Text>
          {booking.Payment.map((payment: any, index: number) => (
            <Card key={payment.id} withBorder p="sm" mb="sm">
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">Payment ID</Text>
                  <Text size="sm" style={{ fontFamily: 'monospace' }}>{payment.paymentId}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">Type</Text>
                  <Text size="sm">{payment.paymentType}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">Amount</Text>
                  <Text size="sm">{ghCurrency} {payment.amount}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">Status</Text>
                  <Badge color={payment.status === 'completed' ? 'green' : 'yellow'} variant="light">
                    {payment.status}
                  </Badge>
                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </Card>
      )}
    </Stack>
  );
}