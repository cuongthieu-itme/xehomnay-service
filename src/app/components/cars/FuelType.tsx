import { useFiltersContext } from "@/context/FilterContext";
import { SelectFuelType } from "../home/filterFrom/SelectFuelType";

export const FuelType = () => {
  const { state, updateFilterProperty } = useFiltersContext();

  const handleChange = (value: string | null) => {
    updateFilterProperty("fuelType", value || "Any");
  };
  return <SelectFuelType value={state.fuelType} onChange={handleChange} />;
};
