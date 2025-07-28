"use client";
import { today } from "@/const";
import { createContext, ReactNode, useContext, useState } from "react";
import { IFiltersContext, IFiltersState } from "../../types";

export const FiltersContext = createContext<IFiltersContext>(undefined as any);
const initialState: IFiltersState = {
  type: "Any",
  minPrice: 0,
  maxPrice: 5000,
  minYear: 2000,
  maxYear: today.getFullYear(),
  transmission: "any",
  fuelType: "Any",
};

export const FiltersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<IFiltersState>(initialState);

  const updateFilterProperty = (
    key: keyof IFiltersState,
    value: IFiltersState[keyof IFiltersState]
  ) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setState(initialState);
  };

  return (
    <FiltersContext.Provider
      value={{
        state,
        updateFilterProperty,
        resetFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  return context;
};
