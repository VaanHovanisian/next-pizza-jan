import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prizma-client";
import { compare, hashSync } from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const isPassword = await compare(credentials.password, user.password);
        if (!isPassword && !user.verified) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.fullName,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        if (!user.email) return false;

        const isUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              {
                email: user.email,
              },
            ],
          },
        });

        if (isUser) {
          await prisma.user.update({
            where: { id: isUser.id },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || `User #${user.id}`,
            password: hashSync(crypto.randomUUID(), 10),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        return token;
      }

      if (!token.email) return token;

      const isUser = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (isUser) {
        token.id = isUser.id;
        token.name = isUser.fullName;
        token.role = isUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
