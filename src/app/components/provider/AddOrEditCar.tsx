"use client";
import { addCar, updateProviderCar } from "@/actions/carAction";
import { primaryGradient } from "@/const";
import { useCarContext } from "@/context/CarContext";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Divider,
  Drawer,
  Flex,
  Group,
  Input,
  LoadingOverlay,
  NumberInput,
  SegmentedControl,
  SimpleGrid,
  Space,
  Textarea,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useState,
} from "react";

import toast from "react-hot-toast";
import { CurrentMode, IReqProviderProps } from "../../../../types";
import { SelectCarMake } from "../home/filterFrom/SelectCarMake";
import { SelectCarType } from "../home/filterFrom/SelectCarType";
import { SelectFuelType } from "../home/filterFrom/SelectFuelType";
import Uploader from "../shared/Uploader";
import { isValidCarDetails } from "./isValidCarDetails";

interface Props {
  openButton: ReactElement<any, string | JSXElementConstructor<any>>;
  mode: CurrentMode;
  opened: boolean;
  open: () => void;
  close: () => void;
  providerDetails: IReqProviderProps;
}
export function AddOrEditCar({
  openButton,
  mode,
  opened,
  open,
  close,
  providerDetails,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    state: carDetails,
    updateProperty,
    addCarImage,
    removeImage,
    resetState,
  } = useCarContext();
  const { refresh } = useRouter();
  // update car image
  const handleUploadCarImages = async (
    result: CloudinaryUploadWidgetResults
  ) => {
    const info: any = result?.info;
    addCarImage(info.secure_url);
  };
  //add feature car
  const handleAddOtherFeatures = (value: string) => {
    let features = [];
    if (value.includes("|")) {
      features = value
        .split("|")
        .filter((item) => item.trim() !== "|" && item.trim() !== "")
        .map((feature) => feature.trim());
    } else {
      features = [value];
    }
    updateProperty("otherFeatures", features);
  };

  //handle Add New Car
  const handleAddNewCar = async () => {
    setIsSubmitting(true);
    const { isValid, message } = isValidCarDetails(carDetails);
    if (isValid) {
      const details: any = {
        ...carDetails,
        provider_id: providerDetails?.id,
        country_id: providerDetails.country.id,
        region_id: providerDetails.region.id,
      };
      if (mode === "new") {
        const car = await addCar(details);

        if (car.error) {
          toast.error(car.error);
          setIsSubmitting(false);
        } else {
          refresh();
          setIsSubmitting(false);
          toast.success("Car added successfully");
          resetState();
          close();
        }
      }

      // update car
      if (mode === "edit") {
        const cloneCarDetails = { ...details };

        const updateCar = await updateProviderCar(cloneCarDetails);
        if (updateCar?.error) {
          toast.error(updateCar.error);
          setIsSubmitting(false);
        } else {
          refresh();
          setIsSubmitting(false);
          toast.success("Car updated successfully");
          resetState();
          close();
        }
      }
    } else {
      toast.error(message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={isSubmitting}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Drawer
        position="right"
        size="xl"
        opened={opened}
        onClose={close}
        title="Add New Car"
        transitionProps={{
          transition: "slide-left",
        }}
      >
        <Divider mb="1rem" />

        <Uploader
          onUpload={handleUploadCarImages}
          options={{
            maxFiles: 6,
            multiple: true,
            singleUploadAutoClose: false,
            showUploadMoreButton: false,
            folder: "car-go-rentals/cars",
          }}
        />
        <Flex wrap="wrap" gap={8} mb="2rem" mt="2rem">
          {carDetails.images.map((image: any, i): any => (
            <CarImage
              key={i}
              imageurl={image}
              url={image}
              removeImage={removeImage}
            />
          ))}
        </Flex>

        <Group grow my="sm">
          <Box>
            <Input.Label required={!carDetails.description}>
              Description
            </Input.Label>
            <Textarea
              value={carDetails.description}
              onChange={(e) => updateProperty("description", e.target.value)}
              placeholder="add a brief description of your vehicle for users"
            />
          </Box>
        </Group>
        <GridLayout>
          <SelectCarType
            required={!carDetails.bodyType}
            value={carDetails.bodyType}
            onChange={(value) => updateProperty("bodyType", value)}
          />
          <SelectCarMake
            value={carDetails.make}
            onChange={(value) => updateProperty("make", value)}
            required={!carDetails.make}
          />
          <Box>
            <Input.Label required={!carDetails.model}>Model</Input.Label>
            <Input
              type="text"
              placeholder="Car model"
              value={carDetails.model}
              onChange={(e) => updateProperty("model", e.target.value)}
            />
          </Box>

          <YearPickerInput
            required={!carDetails.year}
            label="Year"
            placeholder="Year"
            value={new Date(carDetails.year, 0, 1)}
            maxDate={new Date()}
            onChange={(value) => updateProperty("year", value?.getFullYear())}
          />
          <Box>
            <Input.Label>Transmission</Input.Label>
            <br />
            <SegmentedControl
              w="100%"
              value={carDetails.transmission}
              onChange={(value) => updateProperty("transmission", value)}
              data={[
                { label: "Automatic", value: "automatic" },
                { label: "Manual", value: "manual" },
              ]}
            />
          </Box>

          <Box>
            <Input.Label required={!carDetails.engineCapaciy}>
              Engine Capacity
            </Input.Label>
            <Input
              type="text"
              placeholder="2.5L"
              value={carDetails.engineCapaciy}
              onChange={(e) => updateProperty("engineCapaciy", e.target.value)}
            />
          </Box>

          <SelectFuelType
            required={!carDetails.fuelType}
            value={carDetails.fuelType}
            onChange={(value) => updateProperty("fuelType", value)}
          />

          <NumberInput
            label="Seating Capacity"
            required={!carDetails.seatsCapacity}
            step={1}
            min={1}
            value={carDetails.seatsCapacity}
            onChange={(value) => updateProperty("seatsCapacity", value)}
          />

          <NumberInput
            label="Number of Bags"
            required={!carDetails.bagsCapacity}
            step={1}
            min={1}
            value={carDetails.bagsCapacity}
            onChange={(value) => updateProperty("bagsCapacity", value)}
          />

          <NumberInput
            label="Number of Doors"
            required={!carDetails.doorsCapacity}
            step={1}
            min={1}
            value={carDetails.doorsCapacity}
            onChange={(value) => updateProperty("doorsCapacity", value)}
          />

          <Box w="100%">
            <Input.Label required={!carDetails.color}>Color</Input.Label>
            <Input
              w="100%"
              type="text"
              placeholder="E.g. Black"
              value={carDetails.color}
              onChange={(e) => updateProperty("color", e.target.value)}
            />
          </Box>
        </GridLayout>

        <Group grow my="sm">
          <Box>
            <Input.Label>
              Other Features. Separate features with {'"|"'}
            </Input.Label>
            <Textarea
              placeholder="E.g. Bluetooth | Backup Camera | Android Screen |  Keyless Entry"
              defaultValue={carDetails.otherFeatures
                ?.map((f: any) => f.feature)
                ?.join(" | ")}
              onChange={(e) => handleAddOtherFeatures(e.target.value)}
            />
          </Box>
        </Group>

        <Group grow mt="1rem">
          <Checkbox
            checked={carDetails.acAvailable}
            onChange={(e) =>
              updateProperty("acAvailable", e.currentTarget.checked)
            }
            label="AC Available"
            color="orange"
          />
          <Checkbox
            label="AC Working"
            color="orange"
            disabled={!carDetails.acAvailable}
            checked={carDetails.acAvailable && carDetails.acWorking}
            onChange={(e) =>
              updateProperty("acWorking", e.currentTarget.checked)
            }
          />
        </Group>

        <Group grow pt="xl">
          <NumberInput
            label="Price Per Hour"
            required={!carDetails.pricePerHour}
            value={carDetails.pricePerHour}
            onChange={(value) => updateProperty("pricePerHour", value)}
          />
          <NumberInput
            label="Price Per Day"
            required={!carDetails.pricePerDay}
            value={carDetails.pricePerDay}
            onChange={(value) => updateProperty("pricePerDay", value)}
          />
        </Group>
        <Space pt="xl" />
        <GridLayout>
          <NumberInput
            label="Minimum Rental Period (Hours/Days)"
            required={!carDetails.minimumRent}
            step={1}
            min={1}
            value={carDetails.minimumRent}
            onChange={(value) => updateProperty("minimumRent", value)}
          />

          <NumberInput
            label="Maximum Rental Period (Hours/Days)"
            step={1}
            min={1}
            value={carDetails.maximumRent}
            onChange={(value) => updateProperty("maximumRent", value)}
          />
        </GridLayout>

        <Flex justify="flex-end" my="lg">
          <Button
            onClick={handleAddNewCar}
            miw="200px"
            variant="gradient"
            gradient={primaryGradient}
          >
            {mode === "new" ? "Add Car" : "Update"}
          </Button>
        </Flex>
      </Drawer>

      <>{openButton}</>
    </>
  );
}

const GridLayout = ({ children }: { children: ReactNode }) => (
  <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
    {children}
  </SimpleGrid>
);

const CarImage = ({
  url,
  imageurl,
  removeImage,
}: {
  url: string;
  imageurl: { imageUrl: string };
  removeImage: (url: string) => void;
}) => (
  <Box style={{ position: "relative", display: "inline-block" }}>
    <Avatar size="xl" src={imageurl?.imageUrl || url} />
    <CloseButton
      variant="filled"
      onClick={() => removeImage(imageurl?.imageUrl)}
      aria-label="Remove image"
      className="text-red-600 hover:bg-red-500 hover:text-white"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        transform: "translate(50%, -50%)",
      }}
    />
  </Box>
);
