import { ghCurrencySymbol } from "@/const";
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { IconManualGearbox, IconUsers } from "@tabler/icons-react";
import { CarIcon, FuelIcon } from "lucide-react";
import Link from "next/link";
import { StatusRenderer } from "../StatusRenderer";
import { convertPrice } from "@/lib/price";

export const CarCard = ({ car }: any) => {
  return (
    <Card miw={{ base: "100%", lg: "47%" }}>
      <Flex align="flex-end" justify="space-between">
        <Box>
          <Title order={5}>
            {car.make} {car.model} {car.year}
          </Title>
        </Box>
      </Flex>
      <Flex justify="space-between" align="flex-end">
        <Link href={`/cars/${car.slug}`}>
          <Image
            maw={{ base: 200, md: 250 }}
            height="150px"
            radius="md"
            my={8}
            src={car.images?.[0]?.imageUrl}
            alt={car.make + " " + car.model}
          />
        </Link>

        <Box>
          <Box style={{ textAlign: "center" }} my="md">
            <Box style={{ textAlign: "center" }} my="md">
              {car.status && car.status !== "available" && (
                <StatusRenderer status={car.status} />
              )}
            </Box>
          </Box>

          <Button
            component={Link}
            href={`/cars/${car.slug}`}
            variant="gradient"
            mb="xs"
            disabled={car.status !== "available"}
          >
            Thuê ngay
          </Button>
        </Box>
      </Flex>
      <Divider />
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={{ base: 4, md: 16 }}>
          <Flex my={8} align="center" title="seating capacity">
            <IconUsers size="16px" color="gray" />
            <Text c="gray.6" size="sm" mx={4}>
              {car?.seatsCapacity}
            </Text>
          </Flex>
          <Flex my={8} align="center" title="transmission">
            <IconManualGearbox size="16px" color="gray" />
            <Text c="gray.6" size="sm" mx={4} className="capitalize">
              {car?.transmission}
            </Text>
          </Flex>
          <Flex my={8} align="center" title="Fuel type">
            <FuelIcon size="16px" color="gray" />
            <Text c="gray.6" size="sm" mx={4} className="capitalize">
              {car?.fuelType}
            </Text>
          </Flex>
          <Flex my={8} align="center" title="Body type">
            <CarIcon size="16px" color="gray" />
            <Text c="gray.6" size="sm" mx={4} className="capitalize">
              {car?.bodyType}
            </Text>
          </Flex>
        </Flex>

        <Flex align="flex-end">
          <Text fw="bold" size="lg">
            {convertPrice(car?.pricePerDay)}
          </Text>
          <Text size="xs">/ngày</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
