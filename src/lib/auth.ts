import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../prisma/prisma";
import Resend from "next-auth/providers/resend";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null;
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      };
    },
  }),
  GitHub,
  Resend({
    from: "no-reply@company.com",
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const {
  handlers,
  signIn,
  signOut,
  auth: baseAuth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: providers,
  pages: {
    signIn: "/signin",
  },
});
