import { useFiltersContext } from "@/context/FilterContext";
import { SegmentedControl, Text } from "@mantine/core";

export const Transmission = () => {
  const { state, updateFilterProperty } = useFiltersContext();
  return (
    <>
      <Text my={16}>Hộp số</Text>

      <SegmentedControl
        color="pink"
        radius="lg"
        value={state.transmission}
        onChange={(value) => updateFilterProperty("transmission", value)}
        data={[
          { label: "Bất kỳ", value: "any" },
          { label: "Số sàn", value: "manual" },
          { label: "Số tự động", value: "automatic" },
        ]}
      />
    </>
  );
};
