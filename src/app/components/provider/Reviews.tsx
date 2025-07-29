import { Card, Divider, Text, Title } from "@mantine/core";
import { IResReviewProps } from "../../../../types";
import ReviewCard from "./ReviewCard";

interface ReviewProps {
  reviews: IResReviewProps[];
  user: any;
}
export default function Reviews({ reviews, user }: ReviewProps) {
  return (
    <div>
      <Divider
        my="lg"
        label={
          <Title order={3} className="text-default">
            Đánh giá ({reviews.length})
          </Title>
        }
      />

      {reviews.length === 0 ? (
        <Card my="3rem">
          <Text fs="italic" ta="center">
            No Reviews Available
          </Text>
        </Card>
      ) : (
        <>
          {reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
