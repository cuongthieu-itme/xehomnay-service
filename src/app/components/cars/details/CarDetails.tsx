import {
  Box,
  Card,
  Container,
  Divider,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { StatusRenderer } from "../../StatusRenderer";
import BookingDetails from "./BookingDetails";
import { CarsCarousel } from "./CarsCarousel";
import { Features } from "./Features";
import { ProviderDetails } from "./ProviderDetails";
import { Reviews } from "./Reviews";

export default function CarDetails({ carDetails, user }: any) {
  return (
    <Container size="xl" py="md">
      <Flex gap="md" direction={{ base: "column", md: "row" }}>
        <Card withBorder w={{ base: "100%", md: "calc(100% - 350px)" }}>
          <Flex align="flex-end" justify="space-between">
            <Box>
              <Box my="xs">
                {carDetails?.status !== "available" && (
                  <StatusRenderer status={carDetails?.status} />
                )}
              </Box>

              <Title order={5} size="xl">
                {carDetails?.make} {carDetails?.model} {carDetails?.year}
              </Title>
              <Text c="gray.6">{carDetails?.bodyType}</Text>
            </Box>
          </Flex>
          <CarsCarousel images={carDetails?.images} />

          <Box my="lg">
            <Title order={5} my="xs">
              Mô tả
            </Title>

            <Text size="md" color="gray.6">
              {carDetails?.description}
            </Text>
          </Box>
          <Features
            seatsCapacity={carDetails.seatsCapacity}
            transmission={carDetails?.transmission}
            fuelType={carDetails?.fuelType}
            engineCapaciy={carDetails.engineCapaciy}
            otherFeatures={carDetails.otherFeatures}
            acAvailable={carDetails.acAvailable}
            acWorking={carDetails.acWorking}
          />
        </Card>
        <BookingDetails carDetails={carDetails} user={user} />
      </Flex>
      <Box maw="90%" mx="auto">
        {carDetails?.provider && (
          <ProviderDetails provider={carDetails?.provider} />
        )}

        <Divider
          my="xl"
          label={
            <Title order={3} className="text-muted">
              Đánh giá
            </Title>
          }
        />
        <Reviews reviews={carDetails?.review} user={user} />
      </Box>
    </Container>
  );
}
