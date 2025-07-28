"use server";

import prisma from "@/prisma";

// create a new booking
export const createBooking = async (data: any) => {
  try {
    const [booking, car] = await prisma.$transaction([
      prisma.booking.create({
        data: {
          userId: data.userId,
          carId: data.carId,
          providerId: data.providerId,
          pickUpDate: data.pickupDate,
          returnDate: data.returnDate,
          totalPrice: data.totalPrice,
          rentalTime: data.rentalTime,
          hOrday: data.hOrday,
          status: data.status,
        },
      }),
      prisma.car.update({
        where: { id: data.carId },
        data: { status: data.status },
      }),
    ]);
    return { booking, car };
  } catch (error) {
    console.log(error);
    return { error: "Car Booking Failed" };
  }
};

// get all bookings

// create review
export const createReview = async (data: any) => {
  try {
    //check if the user has already reviewed the car
    const reviewExists = await prisma.review.findFirst({
      where: {
        userId: data.userId,
        carId: data.carId,
      },
    });
    if (reviewExists) {
      return { error: "You have already reviewed this car" };
    }
    const review = await prisma.review.create({
      data: {
        userId: data.userId,
        carId: data.carId,
        providerId: data.providerId,
        rate: data.rate,
        comment: data.comment,
      },
    });
    return {
      status: "success",
      message: "Review Submit Successfully",
    };
  } catch (error) {
    return { error: "Review Submit Failed" };
  }
};

// like , dislike review
export const likeDislikeReview = async (data: any) => {
  try {
    const review = await prisma.review.update({
      where: { id: data.reviewId },
      data: {
        likes: Number(data.likes),
        dislikes: Number(data.dislikes),
      },
    });
    return { status: "success", message: "Review Liked" };
  } catch (error) {
    return { error: "Review Like Failed" };
  }
};
