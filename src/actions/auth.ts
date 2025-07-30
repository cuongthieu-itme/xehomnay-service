"use server";

import { sendMail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { IReqProviderProps, IReqUserProps, IResReviewProps } from "../../types";

//create a new provider with the given credentials
export const signUpWithCredentials = async (
  email: string,
  password: string,
  companyDetails: Partial<IReqProviderProps>
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userExists?.emailVerified) {
      return {
        error: "Provider already exists. Please try another one. or Try Login",
      };
    }

    if (userExists && !userExists.emailVerified) {
      // Generate the email verification token
      const token = await generateVerificationToken(userExists?.email);
      await sendMail(
        userExists?.email,
        "Verify your email",
        token.token,
        "verify"
      );
      return {
        error:
          "Provider is already registered but not verified. A new verification email has been sent.",
      };
    }
    const user = await prisma.user.create({
      data: {
        email: email,
        name: companyDetails.contactName,
        password: hashedPassword,
        image: companyDetails.avatar,
        role: "provider",
      },
    });
    if (!user) {
      return { error: "Error creating provider" };
    } else {
      // Use the userId from the created user for the provider
      const provider = await prisma.provider.create({
        data: {
          userId: user.id,
          email: companyDetails.email,
          companyName: companyDetails.companyName,
          businessReg: companyDetails.businessRegistrationNumber,
          contactName: companyDetails.contactName,
          contactPhone: companyDetails.phone,
          countryId: companyDetails.country_id,
          regionId: companyDetails.region_id,
          city: companyDetails.city,
          street: companyDetails.street,
          avatar: companyDetails.avatar,
          latitude: companyDetails.latitude,
          longitude: companyDetails.longitude,
        },
      });
      // Generate the email verification token
      const token = await generateVerificationToken(email.toLowerCase());
      await sendMail(
        email.toLowerCase(),
        "Verify your email",
        token.token,
        "verify"
      );
    }
    // revalidatePath("/provider");
    return {
      status: "success",
      message: "Tạo tài khoản thành công! Vui lòng kiểm tra email của bạn",
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

//create a new user with the given credentials
export const signUpUserWithCredentials = async (
  email: string,
  password: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (userExists?.emailVerified) {
      return {
        error: "User already exists. Please try another one. or Try login",
      };
    }

    if (userExists && !userExists.emailVerified) {
      // Generate the email verification token
      const token = await generateVerificationToken(userExists?.email);
      await sendMail(
        userExists?.email,
        "Verify your email",
        token.token,
        "verify"
      );
      return {
        error:
          "User is already registered but not verified. A new verification email has been sent.",
      };
    }

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "user",
      },
    });

    // Generate the email verification token
    const token = await generateVerificationToken(email.toLowerCase());
    await sendMail(
      email.toLowerCase(),
      "Verify your email",
      token.token,
      "verify"
    );

    return {
      status: "success",
      message: "Tạo tài khoản thành công! Vui lòng kiểm tra email của bạn",
    };
  } catch (error: any) {
    console.error("Error in signUpUserWithCredentials:", error);
    return { error: error.message };
  }
};

// Update user profile details
export const updateUserProfile = async (updateDetails: IReqUserProps) => {
  try {
    const id = updateDetails.id;
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: updateDetails.avatar || "",
        name: updateDetails.firstName + " " + updateDetails.lastName,
      },
    });

    const existingUserProfile = await prisma.userProfile.findUnique({
      where: {
        userId: id,
      },
    });

    if (existingUserProfile) {
      await prisma.userProfile.update({
        where: {
          userId: id,
        },
        data: {
          firstName: updateDetails.firstName,
          lastName: updateDetails.lastName,
          phone: updateDetails.phone,
          countryId: updateDetails.country_id,
          regionId: updateDetails.region_id,
          city: updateDetails.city,
          state: updateDetails.state,
          dob: updateDetails?.dateOfBirth
            ? new Date(updateDetails.dateOfBirth).toISOString()
            : undefined,
          gender: updateDetails.gender,
          avatar: updateDetails.avatar,
        },
      });
    } else {
      await prisma.userProfile.create({
        data: {
          userId: id,
          firstName: updateDetails.firstName,
          lastName: updateDetails.lastName,
          phone: updateDetails.phone,
          countryId: updateDetails.country_id,
          regionId: updateDetails.region_id,
          city: updateDetails.city,
          state: updateDetails.state,
          dob: updateDetails?.dateOfBirth
            ? new Date(updateDetails.dateOfBirth).toISOString()
            : undefined,
          gender: updateDetails.gender,
          avatar: updateDetails.avatar,
        },
      });
    }
    return { status: "success", message: "Profile updated successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to update profile" };
  }
};

// get logged in user details
export const getUserDetails = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
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
          },
        },
      },
    });
    return user;
  } catch (error) {
    return { error: "User fetch error" };
  }
};

//get booking details of a user
export const getBookingDetails = async (userId: string) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        pickUpDate: true,
        returnDate: true,
        rentalTime: true,
        hOrday: true,
        totalPrice: true,
        status: true,
        carId: true,
        car: {
          select: {
            id: true,
            slug: true,
            make: true,
            model: true,
            images: true,
          },
        },
      },
    });
    return bookings;
  } catch (error) {
    return { error: "Error fetching booking details" };
  }
};

//get booking details of a provider
export const getProviderBookingDetails = async (
  providerId: string,
  carId: string
) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        providerId: providerId,
        carId: carId,
      },
      select: {
        id: true,
        createdAt: true,
        pickUpDate: true,
        returnDate: true,
        totalPrice: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return bookings;
  } catch (error) {
    console.log("Error in getProviderBookingDetails:", error);
    return { error: "Error fetching provider booking details" };
  }
};

//get providerDetails of a provider by userId
export const getProviderDetails = async (userId: string) => {
  try {
    const provider = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        image: true,
        name: true,
        role: true,
        Provider: {
          select: {
            id: true,
            companyName: true,
            contactName: true,
            businessReg: true,
            contactPhone: true,
            city: true,
            street: true,
            avatar: true,
            latitude: true,
            longitude: true,
            active: true,
            email: true,
            country: {
              select: {
                id: true,
                name: true,
              },
            },
            region: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return provider;
  } catch (error) {
    console.log("Error in getProviderDetails:", error);
    return { error: "Error fetching provider details" };
  }
};

//update provider account details
export const updateProviderAccount = async (
  userId: string,
  providerId: string,
  companyDetails: Partial<IReqProviderProps>
) => {
  try {
    const providerUpdate = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email: companyDetails.email,
          name: companyDetails.contactName,
          image: companyDetails.avatar,
        },
      }),
      prisma.provider.update({
        where: {
          id: providerId,
        },
        data: {
          email: companyDetails.email,
          companyName: companyDetails.companyName,
          businessReg: companyDetails.businessReg,
          contactName: companyDetails.contactName,
          contactPhone: companyDetails.contactPhone,
          countryId: companyDetails.country_id,
          regionId: companyDetails.region_id,
          city: companyDetails.city,
          street: companyDetails.street,
          avatar: companyDetails.avatar,
          latitude: companyDetails.latitude,
          longitude: companyDetails.longitude,
        },
      }),
    ]);
    if (!providerUpdate) {
      return { error: "Error updating provider" };
    }
    return { status: "success", message: "Provider updated successfully" };
  } catch (error) {
    return { error: "Failed to update provider" };
  }
};

//get provider reviews
export const providerGetReviews = async (
  userId: string
): Promise<IResReviewProps[]> => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        providerId: userId,
      },
      select: {
        id: true,
        rate: true,
        comment: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return reviews;
  } catch (error: any) {
    return [] as IResReviewProps[];
  }
};

// update provider booking status also update car status
export const updateProviderBookingStatus = async (
  bookingId: string,
  carId: string,
  value: "approve" | "reject"
) => {
  try {
    let bookingStatus = { status: "pending" };
    let carStatus = { status: "pending" };
    if (value === "approve") {
      bookingStatus = { status: "approved" };
      carStatus = { status: "booked" };
    } else {
      bookingStatus = { status: "rejected" };
      carStatus = { status: "available" };
    }
    const res = await prisma.$transaction([
      prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: bookingStatus,
      }),
      prisma.car.update({
        where: {
          id: carId,
        },
        data: carStatus,
      }),
    ]);
    if (!res) {
      return { error: "Error updating booking status" };
    }
    return {
      status: "success",
      message: "Booking status updated successfully",
    };
  } catch (error) {
    console.log("Error in updateProviderBookingStatus:", error);
    return { error: "Failed to update booking status" };
  }
};

// forgot password link send email
export const forgotPassword = async (email: string) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!checkEmail) {
    return {
      error: "Email not found",
      status: 404,
    };
  }
  const token = await prisma.verificationToken.create({
    data: {
      email: email,
      token: Math.floor(100000 + Math.random() * 900000).toString(),
      expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    },
  });

  // send email
  await sendMail(email, "Forgot password token", token.token, "reset");

  return {
    success: "Email sent",
    status: 200,
  };
};

// verfify token
export const verifyToken = async (token: string) => {
  const checkToken = await prisma.verificationToken.findFirst({
    where: {
      token: token,
    },
  });
  if (!checkToken) {
    return {
      error: "Invalid token",
      status: 404,
    };
  }
  if (checkToken.expires < new Date()) {
    return {
      error: "Token expired",
      status: 400,
    };
  }
  return {
    success: "Token verified",
    status: 200,
  };
};
// reset password
export const resetPassword = async (email: string, newpassword: string) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!checkEmail) {
    return {
      error: "Email not found",
      status: 404,
    };
  }
  const hashedPassword = await bcrypt.hash(newpassword, 10);
  const updatePass = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: hashedPassword,
    },
  });
  // send email
  // await sendMail(email, "Forgot password token", token.token, "reset");
  return {
    success: "Password Reset successfully",
    status: 200,
  };
};
