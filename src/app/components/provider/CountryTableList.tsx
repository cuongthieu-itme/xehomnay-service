"use client";
import { Table } from "@mantine/core";

function CountryTableList({ countries }: any) {
  const rows = countries?.map((element: any, i: number) => (
    <Table.Tr key={i}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>S.No</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
export default CountryTableList;
