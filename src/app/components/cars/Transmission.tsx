import { useFiltersContext } from "@/context/FilterContext";
import { SegmentedControl, Text } from "@mantine/core";

export const Transmission = () => {
  const { state, updateFilterProperty } = useFiltersContext();
  return (
    <>
      <Text my={16}>Transmission</Text>

      <SegmentedControl
        color="pink"
        radius="lg"
        value={state.transmission}
        onChange={(value) => updateFilterProperty("transmission", value)}
        data={[
          { label: "Any", value: "any" },
          { label: "Manual", value: "manual" },
          { label: "Automatic", value: "automatic" },
        ]}
      />
    </>
  );
};
