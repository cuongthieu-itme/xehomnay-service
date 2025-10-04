"use client";
import { Table } from "@mantine/core";
import { StatusRenderer } from "../StatusRenderer";

function RegionTableList({ regions }: any) {
  const rows = regions?.map((element: any, i: number) => (
    <Table.Tr key={i}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element?.country?.name}</Table.Td>
      <Table.Td>
        <StatusRenderer status={element.status} variant="light" />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>STT</Table.Th>
          <Table.Th>Tên</Table.Th>
          <Table.Th>Quốc gia</Table.Th>
          <Table.Th>Trạng thái</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
export default RegionTableList;
