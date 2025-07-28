"use client";
import { useLocalStorage } from "@mantine/hooks";
import { ReactNode, createContext, useContext } from "react";
import { ICarContext, ICarState, IReqCarProps } from "../../types";

const CarContext = createContext<ICarContext>(undefined as any);

const initialCarState: IReqCarProps = {
  make: "",
  model: "",
  bodyType: "sedan",
  year: new Date().getFullYear(),
  transmission: "automatic",
  engineCapaciy: "1.0L",
  fuelType: "",
  description: "",
  seatsCapacity: 5,
  bagsCapacity: 2,
  doorsCapacity: 4,
  acAvailable: false,
  acWorking: false,
  images: [],
  otherFeatures: [],
  color: "",
  status: "available",
  provider_id: "",
  country_id: 0,
  region_id: 0,
  pricePerHour: 50,
  pricePerDay: 300,
  minimumRent: 1,
  maximumRent: "",
  id: 0,
};

const initialState: ICarState = initialCarState;

interface Props {
  children: ReactNode;
}
export const CarContextProvider = ({ children }: Props) => {
  const [state, setState] = useLocalStorage<ICarState>({
    key: "car-go-82AXB76CD",
    defaultValue: initialState,
  });

  const updateProperty = (key: keyof IReqCarProps, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const addInitialState = (state: ICarState) => {
    setState(state);
  };

  const addCarImage = (url: string) => {
    setState((prevState) => ({
      ...prevState,
      images: [...prevState.images, url],
    }));
  };

  const removeImage = (url: string) => {
    setState((prevState) => ({
      ...prevState,
      images: prevState.images.filter((image: any) => image?.imageUrl !== url),
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <CarContext.Provider
      value={{
        state: state || initialCarState,
        updateProperty,
        addInitialState,
        addCarImage,
        removeImage,
        resetState,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  return context;
};
