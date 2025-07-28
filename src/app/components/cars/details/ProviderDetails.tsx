import { Avatar, Box, Flex, Text, Title } from "@mantine/core";

interface Props {
  provider: {
    companyName: string;
    avatar: string;
    email: string;
    contactPhone: string;
  };
}
export const ProviderDetails = ({ provider }: Props) => {
  return (
    <Flex
      justify="space-between"
      align={{ base: "flex-start", md: "center" }}
      direction={{ base: "column", md: "row" }}
      my={16}
    >
      <Box>
        <Flex align="center" gap={8}>
          <Avatar
            src={provider.avatar}
            style={{ border: "1px solid gray" }}
            radius="xl"
            c="pink"
          />
          <Title order={3} className="text-default">
            {provider.companyName}
          </Title>
        </Flex>
        <div
          className="flex flex-col ml-10 gap-2 md:flex-row justify-around"
          style={{ fontSize: "small" }}
        >
          <Text
            component="a"
            href={`tel:${provider.contactPhone}`}
            className="text-muted"
          >
            {provider.contactPhone}
          </Text>

          <Text
            component="a"
            href={`mailto:${provider.email}`}
            className="text-muted"
          >
            {provider.email}
          </Text>
        </div>
      </Box>
    </Flex>
  );
};
