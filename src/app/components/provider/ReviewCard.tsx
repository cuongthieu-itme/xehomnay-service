"use client";

import { likeDislikeReview } from "@/actions/bookings";
import Toast from "@/lib/Toast";
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Flex,
  Rating,
  Text,
} from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IResReviewProps } from "../../../../types";

interface Props {
  review: IResReviewProps;
  user: any;
}

export default function ReviewCard({ review, user }: Props) {
  const { refresh } = useRouter();
  const [data, setData] = useState({
    likes: review.likes,
    dislikes: review.dislikes,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleReaction = async (type: "likes" | "dislikes") => {
    try {
      setIsLoading(true);
      const updatedData = {
        ...data,
        [type]: data[type] + 1,
      };
      setData(updatedData);

      const res = await likeDislikeReview({
        reviewId: review.id,
        likes: updatedData.likes,
        dislikes: updatedData.dislikes,
      });

      if (res.error) {
        toast.error(res.error);
        // Revert the state in case of an error
        setData(data);
      } else {
        toast.success("Cập nhật đánh giá thành công");
        refresh();
      }
    } catch (error) {
      toast.error("An error occurred while updating the review.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex gap={16}>
        <Avatar size="md" radius="xl" color="blue" />
        <Toast />
        <Box>
          <Text size="sm" fw={500} className="text-muted">
            {review.user.name}
          </Text>
          <Rating value={review.rate} fractions={2} readOnly />
          <Text className="text-default">{review.comment}</Text>
          {user?.role === "user" && (
            <>
              <Flex gap="md" my="lg">
                <Box>
                  <ActionIcon
                    radius="xl"
                    color="gray.1"
                    bg="blue"
                    size="lg"
                    onClick={() => handleReaction("likes")}
                    disabled={isLoading}
                  >
                    <IconThumbUp />
                  </ActionIcon>
                  <Text size="xs" ta="center" className="text-muted">
                    {data.likes}
                  </Text>
                </Box>

                <Box>
                  <ActionIcon
                    radius="xl"
                    color="gray.1"
                    bg="blue"
                    size="lg"
                    onClick={() => handleReaction("dislikes")}
                    disabled={isLoading}
                  >
                    <IconThumbDown />
                  </ActionIcon>
                  <Text size="xs" ta="center" className="text-muted">
                    {data.dislikes}
                  </Text>
                </Box>
              </Flex>
            </>
          )}
        </Box>
      </Flex>

      <Divider my="md" />
    </>
  );
}
