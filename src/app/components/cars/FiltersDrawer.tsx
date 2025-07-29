import { Button, Drawer, Flex, Space, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilterCog } from "@tabler/icons-react";
import { BodyType } from "./BodyType";
import { FuelType } from "./FuelType";
import { PriceRange } from "./PriceRange";
import { ResetFiltersButton } from "./ResetFiltersButton";
import { Transmission } from "./Transmission";
import { YearModel } from "./YearModel";

export const FiltersDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={"Bộ lọc"}
        display={{ base: "inline-block", md: "none" }}
        position="top"
        size="xl"
        pt="100px"
        // without this prop, opening the drawer in prod will throw a client side exception
        transitionProps={{
          transition: "slide-down",
        }}
      >
        <Flex align="center" justify="space-between">
          <Title order={4}>Bộ lọc</Title>
          <ResetFiltersButton />
        </Flex>

        <BodyType />
        <PriceRange />
        <YearModel />
        <Transmission />
        <Space my="lg" />
        <FuelType />
      </Drawer>

      <Button
        onClick={open}
        variant="subtle"
        display={{ base: "inline-block", md: "none" }}
      >
        <IconFilterCog size="14px" />{" "}
        <Text component="span" mx={2}>
          Bộ lọc
        </Text>
      </Button>
    </>
  );
};
