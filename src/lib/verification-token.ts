import prisma from "@/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const emailFind = await prisma.verificationToken.findFirst({
      where: {
        email: email,
      },
    });

    return emailFind;
  } catch (error: any) {
    return { error: "Token create Failed" };
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const tokenFind = await prisma.verificationToken.findFirst({
      where: {
        token: token,
      },
    });

    return tokenFind;
  } catch (error) {
    return { error: "Token create Failed" };
  }
};
