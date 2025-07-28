"use server";

import prisma from "@/prisma";
export const prodiverStatics = async (providerId: any) => {
  try {
    const totalBooking = await prisma.booking.count({
      where: { providerId },
    });
    const totalCar = await prisma.car.count({
      where: { providerId: providerId },
    });
    const totalReview = await prisma.review.count({
      where: { providerId: providerId },
    });
    const totalUser = await prisma.booking.count({
      where: { providerId },
      select: { userId: true },
    });
    return { totalBooking, totalCar, totalReview, totalUser, statusCode: 200 };
  } catch (error: any) {
    return { error: error.message, statusCode: 500 };
  }
};

// car type statics for provider dashboard
export const carTypeStatics = async (providerId: any) => {
  try {
    let carType = await prisma.car.findMany({
      where: { providerId },
      select: { make: true },
    });
    carType = carType?.reduce((acc: any, curr: any) => {
      if (acc[curr.make]) {
        acc[curr.make] += 1;
      } else {
        acc[curr.make] = 1;
      }
      return acc;
    }, {});

    return { carType, statusCode: 200 };
  } catch (error: any) {
    return { error: error.message, statusCode: 500 };
  }
};

// admin statics
// admin statics
export const adminStatics = async ()=>{
  try {
    const totalBooking = await prisma.booking.count();
    const totalCar = await prisma.car.count();
    const totalReview = await prisma.review.count();
    const totalUser = await prisma.booking.count();
    return { totalBooking, totalCar, totalReview, totalUser, statusCode: 200 };
  } catch (error:any) {
    return { error: error.message, statusCode: 500 };
  }
}
