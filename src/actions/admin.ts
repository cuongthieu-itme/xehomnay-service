"use server";

import prisma from "@/prisma";

// get logged in admin details from database
export const getAdminDetails = async (id: string) => {
  try {
    const admin = await prisma.user.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        status: true,
        emailVerified: true,
        email: true,
        image: true,
        role: true,
      },
    });
    return admin;
  } catch (error) {
    return { error: "Failed to get admin details" };
  }
};

// get all provider list from database
export const getAllProvider = async () => {
  try {
    const providers = await prisma.provider.findMany({
      select: {
        id: true,
        companyName: true,
        contactName: true,
        contactPhone: true,
        email: true,
        businessReg: true,
        active: true,
        userId: true,
        city: true,
        street: true,
        country: {
          select: {
            name: true,
          },
        },
        region: {
          select: {
            name: true,
          },
        },
        Car: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return providers;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// status update of provider status colum user table in database
export const updateStatus = async (
  id: string,
  active: string,
  userId: string,
  status: string
) => {
  try {
    // Check if the provider has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { providerId: id, status: { in: ["pending", "booked"] } },
    });
    if (checkCar) {
      return { error: "Provider has pending or bookings", statusCode: 400 };
    }

    // Update user, provider, and cars in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { status: status },
      }),
      prisma.provider.update({
        where: { id: id },
        data: { active: active === "true" },
      }),
      prisma.car.updateMany({
        where: { providerId: id },
        data: { status: active === "true" ? "available" : "not available" },
      }),
    ]);

    return {
      status: true,
      message: "Status updated successfully",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error updating status:", error);
    return { error: "Failed to update status", statusCode: 500 };
  }
};

// delete provider from database by id and userId from provider and user table respectively
export const deleteProvider = async (id: string, userId: string) => {
  try {
    // Check if the provider has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { providerId: id, status: { in: ["pending", "booked"] } },
    });
    if (checkCar) {
      return { error: "Provider has pending or bookings", statusCode: 400 };
    }
    await prisma.$transaction([
      prisma.provider.delete({ where: { id: id } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
    return { status: true, message: "Provider deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete provider" };
  }
};

// get all country list from database
export const getAllCountry = async () => {
  try {
    const countries = await prisma.country.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return countries;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// update status of country status column in database
export const updateCountryStatus = async (id: string, status: string) => {
  try {
    // Check if the countryid has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { countryId: id, status: { in: ["pending", "booked"] } },
    });
    if (checkCar) {
      return { error: "Provider has pending or bookings", statusCode: 400 };
    }
    await prisma.$transaction([
      prisma.country.update({
        where: { id: id },
        data: { status: status },
      }),
      prisma.region.updateMany({
        where: { countryId: id },
        data: { status: status },
      }),
    ]);
    return { status: true, message: "Status updated successfully" };
  } catch (error) {
    return { error: "Failed to update status country" };
  }
};

// delete country from database by id
export const deleteCountry = async (id: string) => {
  try {
    // Check if the countryid has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { countryId: id, status: { in: ["pending", "booked"] } },
    });
    if (checkCar) {
      return { error: "Provider has pending or bookings", statusCode: 400 };
    }
    // await prisma.$transaction([
    //   prisma.country.delete({ where: { id: id } }),
    //   prisma.region.deleteMany({ where: { countryId: id } }),
    // ]);
    return { status: true, message: "Country deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete country" };
  }
};

// get all region list from database by countryId
export const getAllRegion = async (countryId: string) => {
  try {
    const regions = await prisma.region.findMany({
      where: { countryId: countryId },
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        country: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return regions;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// update status of region status column in database
export const updateRegionStatus = async (id: string, status: string) => {
  try {
    // Check if the countryid has any pending bookings
    const checkCar = await prisma.car.findFirst({
      where: { regionId: id, status: { in: ["pending", "booked"] } },
    });
    if (checkCar) {
      return { error: "Provider has pending or bookings", statusCode: 400 };
    }
    await prisma.region.update({
      where: { id: id },
      data: { status: status },
    });
    return { status: true, message: "Status updated successfully" };
  } catch (error) {
    return { error: "Failed to update status region" };
  }
};

// delete region from database by id
export const deleteRegion = async (id: string) => {
  try {
    // await prisma.region.delete({ where: { id: id } });
    return { status: true, message: "Region deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete region" };
  }
};

