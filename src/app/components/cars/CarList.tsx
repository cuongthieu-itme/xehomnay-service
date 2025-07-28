import { useFiltersContext } from "@/context/FilterContext";
import { Box, Flex, Space } from "@mantine/core";
import { useEffect, useState } from "react";
import { IResCarProps } from "../../../../types";
import { CarCard } from "./CarCard";
import { NoCarsFound } from "./NoCarsFound";
import { PaginationButtons } from "./PaginationButtons";
const itemsPerPage = 8;
export const CarList = ({ cars }: any) => {
  const { state } = useFiltersContext();
  const [activePage, setPage] = useState(1);
  const [visibleCars, setVisibleCars] = useState<Partial<IResCarProps>[]>([]);
  const total = Math.ceil(cars.length / itemsPerPage);
  const handlePageChange = (value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const start = (value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setVisibleCars(cars.slice(start, end));
  };
  useEffect(() => {
    const filteredCars = cars.filter((car: any) => {
      const typeMatch =
        state.type?.toLowerCase() === "any" ||
        car.bodyType?.toLowerCase() === state.type?.toLowerCase();

      const transmissionMatch =
        state.transmission?.toLowerCase() === "any" ||
        car.transmission?.toLowerCase() === state.transmission.toLowerCase();

      const fuelTypeMatch =
        state.fuelType?.toLowerCase() === "any" ||
        car.fuelType?.toLowerCase() === state.fuelType.toLowerCase();

      const priceRangeMatch =
        car.pricePerDay &&
        car.pricePerDay >= state.minPrice &&
        car.pricePerDay <= state.maxPrice;

      const yearRangeMatch =
        car.year && car.year >= state.minYear && car.year <= state.maxYear;

      return (
        typeMatch &&
        transmissionMatch &&
        fuelTypeMatch &&
        priceRangeMatch &&
        yearRangeMatch
      );
    });

    setVisibleCars(filteredCars.slice(0, itemsPerPage));
  }, [cars, state]);

  return (
    <>
      <Box w={{ base: "100%", md: "calc(100% - 300px)" }}>
        {/* {Math.ceil(cars.length / itemsPerPage) > 1 && (
          <PaginationButtons
            value={activePage}
            handlePageChange={handlePageChange}
            total={total}
          />
        )} */}
        {visibleCars.length === 0 ? (
          <NoCarsFound />
        ) : (
          <Flex wrap="wrap" justify="space-between" gap="md">
            {visibleCars?.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </Flex>
        )}
        <Space my={8} />
        {Math.ceil(cars.length / itemsPerPage) > 1 && (
          <PaginationButtons
            value={activePage}
            handlePageChange={handlePageChange}
            total={total}
          />
        )}
      </Box>
    </>
  );
};
