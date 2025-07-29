import { useFiltersContext } from "@/context/FilterContext";
import { Box, Flex, NumberInput, RangeSlider, Text } from "@mantine/core";
import { convertPrice } from "@/lib/price";

const lowestPrice = 0;
const highestPrice = 50000000;

export const PriceRange = () => {
  const { state, updateFilterProperty } = useFiltersContext();
  const labelFormatter = (value: number) => {
    return `${convertPrice(value)}`;
  };

  function handleSliderChange([min, max]: number[]) {
    updateFilterProperty("minPrice", min);
    updateFilterProperty("maxPrice", max);
  }

  return (
    <>
      <Text my={16}>Khoảng giá</Text>
      <RangeSlider
        py="xl"
        step={10}
        min={lowestPrice}
        max={highestPrice}
        labelAlwaysOn
        value={[state.minPrice, state.maxPrice]}
        label={labelFormatter}
        onChange={handleSliderChange}
        thumbSize={12}
        color="pink"
      />
      <Flex gap={8}>
        <Box>
          <Text size="xs">Giá thấp nhất</Text>
          <NumberInput
            step={10}
            min={lowestPrice}
            max={highestPrice}
            value={state.minPrice}
            onChange={(value) =>
              value !== "" && updateFilterProperty("minPrice", value)
            }
          />
        </Box>
        <Box>
          <Text size="xs">Giá cao nhất</Text>
          <NumberInput
            step={10}
            min={lowestPrice}
            max={highestPrice}
            value={state.maxPrice}
            onChange={(value) =>
              value !== "" && updateFilterProperty("maxPrice", value)
            }
          />
        </Box>
      </Flex>
    </>
  );
};
