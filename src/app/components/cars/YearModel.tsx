import { useFiltersContext } from "@/context/FilterContext";
import { RangeSlider, Text } from "@mantine/core";

const currentYear = new Date().getFullYear();

export const YearModel = () => {
  const { state, updateFilterProperty } = useFiltersContext();

  function handleSliderChange([min, max]: [number, number]) {
    updateFilterProperty("minYear", min);
    updateFilterProperty("maxYear", max);
  }

  return (
    <>
      <Text my={16}>Year</Text>
      <RangeSlider
        py="xl"
        min={1990}
        max={currentYear}
        labelAlwaysOn
        value={[state.minYear, state.maxYear]}
        onChange={handleSliderChange}
        thumbSize={12}
        color="pink"
      />
    </>
  );
};
