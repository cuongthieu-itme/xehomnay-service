import { signIn } from "next-auth/react";

export const loginWithCredentials = async (email: string, password: string) => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  return res;
};
