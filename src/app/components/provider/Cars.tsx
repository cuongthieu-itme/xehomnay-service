"use client";

import { primaryGradient } from "@/const";
import { useCarContext } from "@/context/CarContext";
import { Box, Button, Divider, Group, Table, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { IReqProviderProps, IResCarProps } from "../../../../types";
import { AddOrEditCar } from "./AddOrEditCar";
import TableRow from "./TableRow";

interface Props {
  cars: IResCarProps[] | null;
  providerDetails: IReqProviderProps;
}
const header = (
  <Table.Tr>
    <Table.Th>Image</Table.Th>
    <Table.Th>Make</Table.Th>
    <Table.Th>Model</Table.Th>
    <Table.Th>Year</Table.Th>
    <Table.Th>Type</Table.Th>
    <Table.Th>Status</Table.Th>
  </Table.Tr>
);
export default function Cars({ cars, providerDetails }: Props) {
  const { resetState } = useCarContext();
  const [opened, { open, close }] = useDisclosure(false);
  const rows = cars?.map((car) => (
    <TableRow key={car.id} car={car} providerDetails={providerDetails} />
  ));
  return (
    <>
      <Divider
        my="lg"
        label={
          <Title order={3} className="text-default">
            All Cars ({cars?.length})
          </Title>
        }
      />

      <AddOrEditCar
        openButton={
          <Group justify="right" mb="md">
            <Button
              onClick={() => {
                resetState();
                open();
              }}
              variant="gradient"
              gradient={primaryGradient}
            >
              <IconPlus /> New Car
            </Button>
          </Group>
        }
        providerDetails={providerDetails}
        mode="new"
        open={open}
        close={close}
        opened={opened}
      />

      <Box mah="310px" style={{ overflowY: "auto" }}>
        <Table striped highlightOnHover>
          <Table.Thead>{header}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </>
  );
}
