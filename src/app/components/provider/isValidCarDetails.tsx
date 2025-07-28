import { IReqCarProps } from "../../../../types";

export const isValidCarDetails = (
  carDetails: IReqCarProps
): { isValid: boolean; message: string } => {
  if (carDetails.images.length === 0) {
    return { isValid: false, message: "Please upload at least one car image" };
  }

  if (
    !carDetails.bodyType ||
    !carDetails.description ||
    !carDetails.make ||
    !carDetails.model ||
    !carDetails.year ||
    !carDetails.transmission ||
    !carDetails.engineCapaciy ||
    !carDetails.fuelType ||
    !carDetails.color ||
    !carDetails.seatsCapacity ||
    !carDetails.bagsCapacity ||
    !carDetails.doorsCapacity ||
    !carDetails.fuelType ||
    !carDetails.pricePerDay ||
    !carDetails.minimumRent
  ) {
    return { isValid: false, message: "Please fill in all required fields" };
  }

  return { isValid: true, message: "" };
};
