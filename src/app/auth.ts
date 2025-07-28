import { sendMail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { ISODateString, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};
export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatar?: string | null;
  password?: string | null; // Optional, not used in session
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Write your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Write your password",
        },
      },
      async authorize(credentials: any, req: any) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          throw new Error("No user found");
        }
        if (user && user?.status !== "active") {
          throw new Error(
            "User account is not active. Please contact support."
          );
        }
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) {
          throw new Error("Incorrect password");
        }
        if (user && !user.emailVerified) {
          const token = await generateVerificationToken(user?.email);
          await sendMail(
            user?.email,
            "Verify your email",
            token.token,
            "verify"
          );
          throw new Error(
            "User email not verified. A new verification email has been sent."
          );
        }
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: CustomUser; account: any }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    },
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user: CustomUser;
      trigger?: any;
      session?: any;
    }) {
      if (user) {
        // Remove password from the token
        const { password, ...userWithoutPassword } = user;
        userWithoutPassword.role = user.role == null ? "user" : user.role;
        token.user = userWithoutPassword;
      }
      if (trigger === "update") {
        token.user = session.user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: CustomUser;
    }) {
      // Remove password from the session
      if (token?.user && session) {
        const { password, ...userWithoutPassword } = token.user as CustomUser;
        session.user = userWithoutPassword;
      }
      return session;
    },
  },
};
