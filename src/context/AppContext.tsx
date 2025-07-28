"use client";

import { DateValue } from "@mantine/dates";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { IconType } from "react-icons";
import { CountryGetAllType, RegionGetAllType } from "../../types";
export type SelectItem = {
  label: string;
  value: string;
  icon?: ReactNode | IconType;
};
interface AppState {
  selectedCountry: CountryGetAllType | undefined;
  selectedRegion: RegionGetAllType | undefined;
  carModel: { label: string; value: string } | undefined;
  carMake: SelectItem | undefined;
  picupDate: DateValue | undefined;
  returnDate: DateValue | undefined;
  time: string | undefined;
}
interface IAppContext {
  state: AppState;
  setCountry: (selectedCountry: CountryGetAllType) => void;
  setRegion: (selectedRegion: RegionGetAllType) => void;
  setCarModel: (carModel: { label: string; value: string }) => void;
  setMake: (selectedMake: SelectItem) => void;
  setPicupDate: (picupDate: DateValue) => void;
  setReturnDate: (returnDate: DateValue) => void;
  setTime: (time: string) => void;
}

const AppContext = createContext<IAppContext>(undefined as any);

const initialState: AppState = {
  selectedCountry: undefined,
  selectedRegion: undefined,
  carModel: undefined,
  carMake: undefined,
  picupDate: undefined,
  returnDate: undefined,
  time: undefined,
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<AppState>(initialState);
  const setCountry = useCallback((selectedCountry: CountryGetAllType) => {
    setState((prevState) => ({ ...prevState, selectedCountry }));
  }, []);
  const setRegion = useCallback((selectedRegion: RegionGetAllType) => {
    setState((prevState) => ({ ...prevState, selectedRegion }));
  }, []);
  const setCarModel = useCallback(
    (carModel: { label: string; value: string }) => {
      setState((prevState) => ({ ...prevState, carModel }));
    },
    []
  );
  const setMake = useCallback((selectedMake: SelectItem) => {
    setState((prevState) => ({
      ...prevState,
      carMake: selectedMake,
    }));
  }, []);
  const setPicupDate = useCallback((picupDate: DateValue) => {
    setState((prevState) => ({ ...prevState, picupDate }));
  }, []);
  const setReturnDate = useCallback((returnDate: DateValue) => {
    setState((prevState) => ({ ...prevState, returnDate }));
  }, []);

  const setTime = useCallback((time: string) => {
    setState((prevState) => ({ ...prevState, time }));
  }, []);
  return (
    <AppContext.Provider
      value={{
        state,
        setCountry,
        setRegion,
        setCarModel,
        setMake,
        setPicupDate,
        setReturnDate,
        setTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
