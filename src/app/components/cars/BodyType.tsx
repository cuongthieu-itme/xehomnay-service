import { useFiltersContext } from "@/context/FilterContext";
import { SelectCarType } from "../home/filterFrom/SelectCarType";

export const BodyType = () => {
  const { state, updateFilterProperty } = useFiltersContext();

  const handleChange = (value: string | null) => {
    updateFilterProperty("type", value || "Any");
  };

  return <SelectCarType addAny value={state.type} onChange={handleChange} />;
};
