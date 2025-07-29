"use client";
import { Card, Text, Group, Badge, Grid, Rating } from "@mantine/core";
import { IconStar, IconMessage, IconThumbUp, IconThumbDown } from "@tabler/icons-react";

interface ReviewStatsProps {
  reviews: any[];
}

export default function ReviewStats({ reviews }: ReviewStatsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <Card withBorder p="md">
        <Text size="lg" fw={600} mb="md">
          Review Statistics
        </Text>
        <Text c="dimmed" ta="center">
          No reviews found
        </Text>
      </Card>
    );
  }

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews;
  const fiveStarReviews = reviews.filter(review => review.rate === 5).length;
  const fourStarReviews = reviews.filter(review => review.rate === 4).length;
  const threeStarReviews = reviews.filter(review => review.rate === 3).length;
  const twoStarReviews = reviews.filter(review => review.rate === 2).length;
  const oneStarReviews = reviews.filter(review => review.rate === 1).length;

  // Engagement statistics
  const totalLikes = reviews.reduce((sum, review) => sum + review.likes, 0);
  const totalDislikes = reviews.reduce((sum, review) => sum + review.dislikes, 0);
  const reviewsWithComments = reviews.filter(review => review.comment && review.comment.trim() !== '').length;

  // Recent reviews (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentReviews = reviews.filter(review =>
    new Date(review.createdAt) > sevenDaysAgo
  ).length;

  // Top providers by reviews
  const providerStats = reviews.reduce((acc: any, review) => {
    const providerName = review.provider?.companyName || 'Unknown';
    if (!acc[providerName]) {
      acc[providerName] = { count: 0, totalRating: 0 };
    }
    acc[providerName].count += 1;
    acc[providerName].totalRating += review.rate;
    return acc;
  }, {});

  const topProviders = Object.entries(providerStats)
    .map(([name, data]: any) => ({
      name,
      count: data.count,
      averageRating: data.totalRating / data.count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  // Top cars by reviews
  const carStats = reviews.reduce((acc: any, review) => {
    const carName = `${review.car?.make} ${review.car?.model}` || 'Unknown';
    if (!acc[carName]) {
      acc[carName] = { count: 0, totalRating: 0 };
    }
    acc[carName].count += 1;
    acc[carName].totalRating += review.rate;
    return acc;
  }, {});

  const topCars = Object.entries(carStats)
    .map(([name, data]: any) => ({
      name,
      count: data.count,
      averageRating: data.totalRating / data.count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const stats = [
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: <IconMessage size="1.5rem" />,
      color: "blue",
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      icon: <IconStar size="1.5rem" />,
      color: "yellow",
    },
    {
      title: "5-Star Reviews",
      value: fiveStarReviews,
      icon: <IconStar size="1.5rem" />,
      color: "green",
    },
    {
      title: "Reviews with Comments",
      value: reviewsWithComments,
      icon: <IconMessage size="1.5rem" />,
      color: "teal",
    },
    {
      title: "Total Likes",
      value: totalLikes,
      icon: <IconThumbUp size="1.5rem" />,
      color: "green",
    },
    {
      title: "Total Dislikes",
      value: totalDislikes,
      icon: <IconThumbDown size="1.5rem" />,
      color: "red",
    },
  ];

  return (
    <Card withBorder p="md" mb="lg">
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Review Statistics
        </Text>
        <Badge color="blue" variant="light">
          {totalReviews} Total Reviews
        </Badge>
      </Group>

      <Grid>
        {stats.map((stat, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder p="sm">
              <Group>
                <div style={{ color: `var(--mantine-color-${stat.color}-6)` }}>
                  {stat.icon}
                </div>
                <div>
                  <Text size="xs" c="dimmed">
                    {stat.title}
                  </Text>
                  <Text fw={700} size="lg">
                    {stat.value}
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Grid mt="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder p="sm">
            <Text size="sm" fw={500} mb="xs">
              Rating Distribution
            </Text>
            <Group gap="xs">
              <Badge color="green" variant="light">
                5★: {fiveStarReviews}
              </Badge>
              <Badge color="blue" variant="light">
                4★: {fourStarReviews}
              </Badge>
              <Badge color="yellow" variant="light">
                3★: {threeStarReviews}
              </Badge>
              <Badge color="orange" variant="light">
                2★: {twoStarReviews}
              </Badge>
              <Badge color="red" variant="light">
                1★: {oneStarReviews}
              </Badge>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder p="sm">
            <Text size="sm" fw={500} mb="xs">
              Recent Activity
            </Text>
            <Group gap="xs">
              <Badge color="blue" variant="light">
                {recentReviews} Last 7 Days
              </Badge>
              <Badge color="green" variant="light">
                {averageRating.toFixed(1)} Avg Rating
              </Badge>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {topProviders.length > 0 && (
        <Card withBorder p="sm" mt="md">
          <Text size="sm" fw={500} mb="xs">
            Top Providers by Reviews
          </Text>
          <Group gap="xs">
            {topProviders.map((provider, index) => (
              <Badge key={index} color={index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'} variant="light">
                {provider.name}: {provider.count} reviews ({provider.averageRating.toFixed(1)}★)
              </Badge>
            ))}
          </Group>
        </Card>
      )}

      {topCars.length > 0 && (
        <Card withBorder p="sm" mt="md">
          <Text size="sm" fw={500} mb="xs">
            Top Cars by Reviews
          </Text>
          <Group gap="xs">
            {topCars.map((car, index) => (
              <Badge key={index} color={index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'} variant="light">
                {car.name}: {car.count} reviews ({car.averageRating.toFixed(1)}★)
              </Badge>
            ))}
          </Group>
        </Card>
      )}
    </Card>
  );
}