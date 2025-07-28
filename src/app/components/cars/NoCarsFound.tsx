import { Card, Text, Title } from "@mantine/core";
import { FaBoxOpen } from "react-icons/fa";

export const NoCarsFound = () => {
  return (
    <Card
      shadow="xs"
      padding="lg"
      radius="xl"
      style={{ textAlign: "center" }}
      className="flex flex-col items-center justify-center"
    >
      <Text className="text-default">
        <FaBoxOpen size="4rem" />
      </Text>
      <Title className="text-muted">No Cars Found</Title>
      <Text c="gray.6">Sorry! No cars found for your search</Text>
    </Card>
  );
};
