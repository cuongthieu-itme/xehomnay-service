import { useFiltersContext } from "@/context/FilterContext";
import { Button, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

export const ResetFiltersButton = () => {
  const { resetFilters } = useFiltersContext();
  return (
    <Button variant="subtle" onClick={resetFilters}>
      <IconRefresh size="14px" />{" "}
      <Text component="span" mx={2}>
        Reset All
      </Text>
    </Button>
  );
};
