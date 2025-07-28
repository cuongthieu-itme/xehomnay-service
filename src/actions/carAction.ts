"use server";

import { isValidCarDetails } from "@/app/components/provider/isValidCarDetails";
import prisma from "@/prisma";
import slugify from "react-slugify";
import { IReqCarProps } from "../../types";

//get provider car with providerid
export const getProviderCars = async (providerId: string) => {
  try {
    const providerCars = await prisma.car.findMany({
      where: { providerId: providerId },
      include: {
        images: true,
        otherFeatures: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return providerCars;
  } catch (error) {
    console.log("Error:", error);
    return { error: "Failed to get cars" };
  }
};

//add provider car
export const addCar = async (carDetails: IReqCarProps) => {
  try {
    const { isValid, message } = isValidCarDetails(carDetails);
    if (isValid) {
      let slugTitle =
        carDetails.make + " " + carDetails.model + " " + carDetails.year;

      // Validate foreign keys
      const providerExists = await prisma.provider.findUnique({
        where: { id: carDetails.provider_id },
      });
      const countryExists = await prisma.country.findUnique({
        where: { id: carDetails.country_id },
      });
      const regionExists = await prisma.region.findUnique({
        where: { id: carDetails.region_id },
      });

      if (!providerExists || !countryExists || !regionExists) {
        return {
          error: "The specified provider, country, or region does not exist.",
        };
      }

      const car = await prisma.car.create({
        data: {
          description: carDetails.description,
          slug: slugify(slugTitle),
          bodyType: carDetails.bodyType,
          make: carDetails.make,
          model: carDetails.model,
          year: carDetails.year,
          transmission: carDetails.transmission,
          engineCapaciy: carDetails.engineCapaciy,
          fuelType: carDetails.fuelType,
          seatsCapacity: carDetails.seatsCapacity,
          doorsCapacity: carDetails.doorsCapacity,
          bagsCapacity: carDetails.bagsCapacity,
          acAvailable: carDetails.acAvailable,
          acWorking: carDetails.acWorking,
          pricePerHour: carDetails.pricePerHour,
          pricePerDay: carDetails.pricePerDay,
          minimumRent: carDetails.minimumRent,
          maximumRent: carDetails.maximumRent,
          color: carDetails.color,
          countryId: carDetails.country_id,
          regionId: carDetails.region_id,
          providerId: carDetails.provider_id,
          images: {
            create: carDetails?.images?.map((image) => ({
              imageUrl: image,
            })),
          },
          otherFeatures: {
            create: carDetails?.otherFeatures?.map((feature) => ({
              feature: feature,
            })),
          },
        },
      });

      return { message: "Car added successfully" };
    }
    return { error: message };
  } catch (error: any) {
    // console.log("Error:", error);
    return { error: "Car added Faield" };
  }
};

//update provider car
export const updateProviderCar = async (carDetails: IReqCarProps) => {
  // return { message: "Car updated successfully" };
  try {
    const { isValid, message } = isValidCarDetails(carDetails);
    if (isValid) {
      let slugTitle =
        carDetails.make + " " + carDetails.model + " " + carDetails.year;

      // Validate foreign keys
      const providerExists = await prisma.provider.findUnique({
        where: { id: carDetails.provider_id },
      });
      const countryExists = await prisma.country.findUnique({
        where: { id: carDetails.country_id },
      });
      const regionExists = await prisma.region.findUnique({
        where: { id: carDetails.region_id },
      });

      if (!providerExists || !countryExists || !regionExists) {
        return {
          error: "The specified provider, country, or region does not exist.",
        };
      }

      const car = await prisma.car.update({
        where: { id: carDetails.id },
        data: {
          description: carDetails.description,
          slug: slugify(slugTitle),
          bodyType: carDetails.bodyType,
          make: carDetails.make,
          model: carDetails.model,
          year: carDetails.year,
          transmission: carDetails.transmission,
          engineCapaciy: carDetails.engineCapaciy,
          fuelType: carDetails.fuelType,
          seatsCapacity: carDetails.seatsCapacity,
          doorsCapacity: carDetails.doorsCapacity,
          bagsCapacity: carDetails.bagsCapacity,
          acAvailable: carDetails.acAvailable,
          acWorking: carDetails.acWorking,
          pricePerHour: carDetails.pricePerHour,
          pricePerDay: carDetails.pricePerDay,
          minimumRent: carDetails.minimumRent,
          maximumRent: carDetails.maximumRent,
          color: carDetails.color,
          countryId: carDetails.country_id,
          regionId: carDetails.region_id,
          providerId: carDetails.provider_id,
          images: {
            updateMany: carDetails.images
              ?.filter((image: any) => image.id)
              .map((image: any) => ({
                where: { id: image.id },
                data: { imageUrl: image.imageUrl },
              })),
            createMany: {
              data: carDetails.images
                ?.filter((image: any) => !image.id)
                .map((image: any) => ({
                  imageUrl: image,
                })),
            },
          },

          otherFeatures: {
            updateMany: carDetails.otherFeatures
              ?.filter((feature: any) => feature.id)
              .map((feature: any) => ({
                where: { id: feature.id },
                data: { feature: feature.feature },
              })),
            createMany: {
              data: carDetails.otherFeatures
                ?.filter((feature: any) => !feature.id)
                .map((feature: any) => ({
                  feature: feature,
                })),
            },
          },
        },
      });

      return { message: "Car updated successfully" };
    }
  } catch (error) {
    console.log("Error:", error);
    return { error: "Failed to update car" };
  }
};

//status update provider car
export const updateCarStatus = async (carId: number, status: string) => {
  try {
    // Check rentalTime and hOrday
    const carInfo = await prisma.booking.findFirst({
      where: { carId: carId },
      select: { rentalTime: true, hOrday: true, status: true },
    });

    // carInfo { rentalTime: '11:59', hOrday: '1d' }

    // ========================
    const car = await prisma.car.update({
      where: { id: carId },
      data: { status: status },
    });

    return { data: car, message: "Car status updated successfully" };
  } catch (error) {
    console.error("Error:", error);
    return { error: "Failed to update car status" };
  }
};

//delete provider car
export const deleteCar = async (carId: number) => {
  try {
    const car = await prisma.car.delete({ where: { id: carId } });
    return { message: "Car deleted successfully" };
  } catch (error) {
    console.log("Error:", error);
    return { error: "Failed to delete car" };
  }
};

// get search cars
export const getSearchedCars = async (searchQuery: any) => {
  try {
    const matchFilter: any = {
      countryId: searchQuery.country,
      regionId: searchQuery.region,
    };
    if (searchQuery.carMake && searchQuery.carMake !== "all") {
      matchFilter.make = searchQuery.carMake;
    }
    const cars = await prisma.car.findMany({
      where: matchFilter,
      include: {
        images: true,
        otherFeatures: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return cars;
  } catch (error) {
    console.log("Error:", error);
    return { error: "Failed to get cars" };
  }
};

// get car details
export const getCarDetails = async (userId: string, slug: string) => {
  try {
    const car = await prisma.car.findFirst({
      where: { slug: slug },
      include: {
        images: {
          select: { imageUrl: true },
        },
        otherFeatures: {
          select: { feature: true },
        },
        provider: {
          select: {
            id: true,
            companyName: true,
            avatar: true,
            email: true,
            contactPhone: true,
          },
        },

        country: {
          select: { name: true },
        },
        region: {
          select: { name: true },
        },
        review: {
          select: {
            id: true,
            rate: true,
            comment: true,
            likes: true,
            dislikes: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    const loggedInUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        image: true,
        name: true,
        role: true,
        userProfile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            countryId: true,
            regionId: true,
            city: true,
            state: true,
            dob: true,
            gender: true,
            region: {
              select: { name: true },
            },
            country: {
              select: { name: true },
            },
          },
        },
      },
    });
    // return like {car, user: loggedInUser, provider: car.provider, review: car.review}
    return { car, user: loggedInUser };
  } catch (error) {
    console.log("Error:", error);
    return { error: "Failed to get car details" };
  }
};

// get all cars home page desc
export const getAllCars = async () => {
  try {
    const cars = await prisma.car.findMany({
      include: {
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return cars;
  } catch (error) {
    console.log("get home car", error);
    return { message: "all car fetch Failed" };
  }
};
