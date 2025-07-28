"use client";

import { useAppContext } from "@/context/AppContext";
import { useCountries } from "@/hooks/useCountries";
import { useRegions } from "@/hooks/useRegions";
import { carMakes } from "@/lib/data";
import Toast from "@/lib/Toast";
import {
  getDefaultSelectedCountry,
  getDefaultSelectedRegion,
} from "@/lib/utils";
import { Button, LoadingOverlay } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import DatePicker from "../cars/DatePicker";
import { SelectCarMake } from "./filterFrom/SelectCarMake";
import SelectCountry from "./filterFrom/SelectCountry";
import SelectRegion from "./filterFrom/SelectRegion";
import SelectTime from "./filterFrom/SelectTime";
const CarReserveFrom = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    state: {
      selectedCountry,
      selectedRegion,
      carMake,
      carModel,
      picupDate,
      returnDate,
      time,
    },
    setCountry,
    setRegion,
    setMake,
    setTime,
  } = useAppContext();
  const { countries } = useCountries();
  const { regions } = useRegions(selectedCountry?.id);

  const handleCountryChange = (value: string | null) => {
    if (countries) {
      const country = countries?.filter((country) => country.id === value)[0];
      setCountry(country);
    }
  };

  const handleRegionChange = (value: string | null) => {
    if (regions) {
      const region = regions?.filter((region) => region.id === value)[0];
      setRegion(region);
    }
  };

  const handleCarMakeChange = (value: string) => {
    const selectedMake = carMakes.filter((make) => make.value === value)[0];
    setMake(selectedMake);
  };

  const handleSearchCars = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      selectedCountry &&
      selectedRegion &&
      carMake &&
      picupDate &&
      returnDate &&
      time
    ) {
      const params = `country=${selectedCountry?.id}&region=${selectedRegion?.id}&carMake=${carMake?.value}&pickupDate=${picupDate}&returnDate=${returnDate}&time=${time}`;
      router.push(`/cars?${params}`);
    } else {
      setIsLoading(false);
      toast.error("Please fill all the fields");
    }
  };
  useEffect(() => {
    if (countries) {
      const countryId = searchParams.get("country");

      const selectedCountry = getDefaultSelectedCountry(countries, countryId);
      setCountry(selectedCountry);
    }
  }, [countries, searchParams, setCountry]);
  useEffect(() => {
    if (regions) {
      const regionId = searchParams.get("region");
      const selectedRegion = getDefaultSelectedRegion(regions, regionId);
      setRegion(selectedRegion);
    }
  }, [regions, searchParams, setRegion]);
  return (
    <>
      <div className="carReservation">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Toast />
        <div className="">
          <h2 className="mb-5 font-bold text-3xl">Car Reservation</h2>
        </div>

        <form onSubmit={handleSearchCars}>
          <SelectCountry
            onChange={handleCountryChange}
            value={selectedCountry?.id}
          />
          <SelectRegion
            onChange={handleRegionChange}
            value={selectedRegion?.id}
            countryId={selectedCountry?.id}
          />
          <SelectCarMake
            value={carMake?.value}
            onChange={handleCarMakeChange}
            addAll={true}
          />
          <DatePicker />

          <SelectTime value={time} onChange={(e) => setTime(e)} />
          <div className="buttons">
            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              size="md"
            >
              Search for car
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CarReserveFrom;
