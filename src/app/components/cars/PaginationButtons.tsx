import { Pagination } from "@mantine/core";

interface Props {
  value: number;
  total: number;
  handlePageChange: (value: number) => void;
}
export const PaginationButtons = ({
  value,
  total,
  handlePageChange,
}: Props) => {
  return (
    <Pagination
      size="sm"
      value={value}
      onChange={handlePageChange}
      total={total}
      w="fit-content"
      ml="auto"
      mb={8}
    />
  );
};
