"use client";
import { useAppContext } from "@/context/AppContext";
import { Container } from "@mantine/core";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "./map.module.css";

interface Props {
  height?: string;
}

const MapBox = ({ height }: Props) => {
  const {
    state: { selectedCountry, selectedRegion },
  } = useAppContext();

  const getCordinates = (): [number, number] => {
    if (selectedCountry) {
      return [selectedCountry.latitude || 0, selectedCountry.longitude || 0];
    }
    if (selectedRegion) {
      return [selectedRegion.latitude || 0, selectedRegion.longitude || 0];
    }
    return [14.058324, 108.277199];
  };
  return (
    <Container className={styles.container} mb="1rem" size="100%">
      <MapContainer
        className={styles.mapContainer}
        center={getCordinates()}
        zoom={6}
        style={{ height: height || "300px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <MapPossition
          latitude={getCordinates()[0]}
          longitude={getCordinates()[1]}
          name={
            selectedRegion
              ? selectedRegion.name || ""
              : selectedCountry
              ? selectedCountry.name || ""
              : "Vietnam"
          }
        />
      </MapContainer>
    </Container>
  );
};

export default MapBox;

interface MapMarkerProps {
  latitude: number;
  longitude: number;
  name: string;
}

const MapPossition = ({ latitude, longitude, name }: MapMarkerProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude]);
  }, [map, latitude, longitude]);
  return (
    <Marker position={[latitude, longitude]}>
      <Popup>{name}</Popup>
    </Marker>
  );
};
