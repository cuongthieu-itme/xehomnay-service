import { Card } from "@mantine/core";
import ReviewCard from "../../provider/ReviewCard";

interface Props {
  reviews: any[];
  user: any;
}
export const Reviews = ({ reviews, user }: Props) => {
  return (
    <Card my="md">
      {reviews.length === 0 ? (
        <i>No Reviews available for this car</i>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} user={user} />
        ))
      )}
    </Card>
  );
};
