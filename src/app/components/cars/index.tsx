"use client";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Space,
  Title,
} from "@mantine/core";
import { IconBrandGoogleMaps } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import Breadcrumb from "../shared/Breadcrumb";
import { BodyType } from "./BodyType";
import { CarList } from "./CarList";
import styles from "./cars.module.css";
import { FiltersDrawer } from "./FiltersDrawer";
import { FuelType } from "./FuelType";
import { PriceRange } from "./PriceRange";
import { ResetFiltersButton } from "./ResetFiltersButton";
import { SearchEngine } from "./SearchField";
import { Transmission } from "./Transmission";
import { YearModel } from "./YearModel";
const MapBox = dynamic(() => import("../shared/Map/Map"), {
  ssr: false,
});

export default function CarsPageLayout({ cars }: any) {
  const [showMap, setShowMap] = useState<boolean>(false);

  //map toggle button
  const mapToggle = () => {
    setShowMap(!showMap);
  };

  return (
    <>
      <Breadcrumb label="Cars" />
      <Container className={styles.parentContainer} size="xl" my="sm" py="md">
        <SearchEngine />

        <Flex justify="flex-end">
          <Button
            onClick={mapToggle}
            className={styles.mapToggle}
            size="sm"
            variant="subtle"
          >
            <IconBrandGoogleMaps size="16px" />
            {showMap ? "Hide Map" : "Show Map"}
          </Button>
        </Flex>

        {showMap && <MapBox height="200px" />}

        <Flex
          direction={{ base: "column", md: "row" }}
          className={styles.container}
        >
          {/* Filters */}
          <Card w={{ base: "100%", md: "350px" }}>
            <Flex align="center" justify="space-between">
              <Title order={4}>Filters</Title>
              <Box display={{ base: "none", md: "inline-block" }}>
                <ResetFiltersButton />
              </Box>
              <FiltersDrawer />
            </Flex>

            <Divider my={16} display={{ base: "none", md: "block" }} />

            <Box display={{ base: "none", md: "block" }}>
              <BodyType />
              <PriceRange />
              <YearModel />
              <Transmission />
              <Space my="lg" />
              <FuelType />
            </Box>
          </Card>

          <CarList cars={cars || []} />
        </Flex>
      </Container>
    </>
  );
}
