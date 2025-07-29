"use client";
import { deleteReview, updateReview, getReviewDetailsById } from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { ActionIcon, Table, Button, Group, Badge, Modal, Stack, Card, Text, Grid, TextInput, Textarea, NumberInput, Rating } from "@mantine/core";
import { IconTrash, IconEdit, IconEye, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ConfirmationModal } from "../provider/ConfirmationModal";
import { useState, useEffect } from "react";

interface ReviewListProps {
  reviews: any[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const { refresh } = useRouter();
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState({
    rate: 0,
    comment: "",
  });

  const handleDelete = async (id: string) => {
    const res = await deleteReview(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      refresh();
      toast.success(res.message || "Review deleted successfully");
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedReviewId(id);
    setDetailsModalOpened(true);
  };

  const handleEdit = (review: any) => {
    setSelectedReviewId(review.id);
    setEditData({
      rate: review.rate,
      comment: review.comment || "",
    });
    setEditModalOpened(true);
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      const res = await updateReview(selectedReviewId, editData);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message || "Review updated successfully");
        setEditModalOpened(false);
        refresh();
      }
    } catch (error) {
      toast.error("Failed to update review");
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'green';
    if (rating >= 3) return 'yellow';
    return 'red';
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Review Management
        </Text>
        <Text c="dimmed" ta="center">
          No reviews found
        </Text>
      </Card>
    );
  }

  const rows = reviews?.map((review: any, i: number) => (
    <Table.Tr key={review.id}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>
        <div>
          <Text fw={500} size="sm">{review.user?.name || 'N/A'}</Text>
          <Text size="xs" c="dimmed">{review.user?.email}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <div>
          <Text fw={500} size="sm">{review.car?.make} {review.car?.model}</Text>
          <Text size="xs" c="dimmed">{review.car?.year}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <div>
          <Text fw={500} size="sm">{review.provider?.companyName}</Text>
          <Text size="xs" c="dimmed">{review.provider?.contactName}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Rating value={review.rate} readOnly size="sm" />
          <Badge color={getRatingColor(review.rate)} variant="light">
            {review.rate}/5
          </Badge>
        </Group>
      </Table.Td>
      <Table.Td>
        <div className="text-sm">
          <div>Likes: {review.likes}</div>
          <div>Dislikes: {review.dislikes}</div>
        </div>
      </Table.Td>
      <Table.Td>
        <div className="text-sm">
          <div>Created: {formatDate(review.createdAt)}</div>
          {review.comment && (
            <div className="text-xs text-gray-500 mt-1">
              {review.comment.length > 50 ? `${review.comment.substring(0, 50)}...` : review.comment}
            </div>
          )}
        </div>
      </Table.Td>
      <Table.Td className="flex gap-1">
        <ActionIcon color="blue" onClick={() => handleViewDetails(review.id)} title="View Details">
          <IconEye size="1.2rem" />
        </ActionIcon>
        <ActionIcon color="orange" onClick={() => handleEdit(review)} title="Edit Review">
          <IconEdit size="1.2rem" />
        </ActionIcon>
        <ConfirmationModal
          name={`Review #${review.id.slice(-6)}`}
          onConfirm={() => handleDelete(review.id)}
          openButton={
            <ActionIcon color="red" title="Delete Review">
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
          <Text size="lg" fw={600}>Review Management</Text>
          <Text size="sm" c="dimmed">Total: {reviews.length} reviews</Text>
        </Group>
        <Table.ScrollContainer minWidth={500} type="native">
          <Table striped stickyHeader highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>User</Table.Th>
                <Table.Th>Car</Table.Th>
                <Table.Th>Provider</Table.Th>
                <Table.Th>Rating</Table.Th>
                <Table.Th>Engagement</Table.Th>
                <Table.Th>Info</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      {/* Review Details Modal */}
      <Modal opened={detailsModalOpened} onClose={() => setDetailsModalOpened(false)} title="Review Details" size="lg">
        {selectedReviewId && (<ReviewDetails reviewId={selectedReviewId} />)}
      </Modal>

      {/* Edit Review Modal */}
      <Modal opened={editModalOpened} onClose={() => setEditModalOpened(false)} title="Edit Review" size="md">
        <Stack gap="md">
          <TextInput
            label="Rating"
            description="Rate from 1 to 5"
            value={editData.rate}
            onChange={(e) => setEditData(prev => ({ ...prev, rate: parseInt(e.target.value) || 0 }))}
            min={1}
            max={5}
            type="number"
          />
          <Rating value={editData.rate} onChange={(value) => setEditData(prev => ({ ...prev, rate: value }))} />
          <Textarea
            label="Comment"
            value={editData.comment}
            onChange={(e) => setEditData(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Enter review comment"
            rows={4}
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={() => setEditModalOpened(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} loading={isLoading}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

// Review Details Component
function ReviewDetails({ reviewId }: { reviewId: string }) {
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      setLoading(true);
      try {
        const result = await getReviewDetailsById(reviewId);
        if (result && !result.error) {
          setReview(result);
        } else {
          console.error('Failed to get review details:', result?.error);
          setReview(null);
        }
      } catch (error) {
        console.error("Error fetching review details:", error);
        setReview(null);
      } finally {
        setLoading(false);
      }
    };
    if (reviewId) {
      fetchReviewDetails();
    }
  }, [reviewId]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  if (!review) {
    return <div className="text-center py-8 text-gray-500">Review not found</div>;
  }

  return (
    <Stack gap="md">
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">Review Information</Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Review ID</Text>
            <Text size="sm" style={{ fontFamily: 'monospace' }}>{review.id}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Rating</Text>
            <Group gap="xs">
              <Rating value={review.rate} readOnly />
              <Badge color={review.rate >= 4 ? 'green' : review.rate >= 3 ? 'yellow' : 'red'} variant="light">
                {review.rate}/5
              </Badge>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Likes</Text>
            <Text size="sm">{review.likes}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Dislikes</Text>
            <Text size="sm">{review.dislikes}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Created At</Text>
            <Text size="sm">{formatDate(review.createdAt)}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Updated At</Text>
            <Text size="sm">{formatDate(review.updatedAt)}</Text>
          </Grid.Col>
          {review.comment && (
            <Grid.Col span={12}>
              <Text size="sm" c="dimmed">Comment</Text>
              <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>{review.comment}</Text>
            </Grid.Col>
          )}
        </Grid>
      </Card>

      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">User Information</Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Name</Text>
            <Text size="sm">{review.user?.name || 'N/A'}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Email</Text>
            <Text size="sm">{review.user?.email}</Text>
          </Grid.Col>
          {review.user?.userProfile && (
            <>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Phone</Text>
                <Text size="sm">{review.user.userProfile.phone || 'N/A'}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed">Location</Text>
                <Text size="sm">{review.user.userProfile.city}, {review.user.userProfile.state}</Text>
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
            <Text size="sm">{review.car?.make} {review.car?.model}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Year</Text>
            <Text size="sm">{review.car?.year}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Color</Text>
            <Text size="sm">{review.car?.color}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Fuel Type</Text>
            <Text size="sm">{review.car?.fuelType}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Transmission</Text>
            <Text size="sm">{review.car?.transmission}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Price Per Day</Text>
            <Text size="sm">${review.car?.pricePerDay}</Text>
          </Grid.Col>
        </Grid>
      </Card>

      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">Provider Information</Text>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Company Name</Text>
            <Text size="sm">{review.provider?.companyName}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Contact Name</Text>
            <Text size="sm">{review.provider?.contactName}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Phone</Text>
            <Text size="sm">{review.provider?.contactPhone}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Email</Text>
            <Text size="sm">{review.provider?.email}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Location</Text>
            <Text size="sm">{review.provider?.city}, {review.provider?.street}</Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Stack>
  );
}