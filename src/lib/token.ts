import prisma from "@/prisma";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";

export const generateVerificationToken = async (email: string) => {
  // Generate a random token
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

  // Check if a token already exists for the user
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create a new verification token
  const tokenCreate = await prisma.verificationToken.create({
    data: {
      token,
      email,
      expires: new Date(expires),
    },
  });

  return tokenCreate;
};
