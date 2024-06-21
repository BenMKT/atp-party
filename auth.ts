// Purpose: This file is responsible for handling authentication and authorization logic in the application. It uses NextAuth to provide authentication services to the application, including sign-in, sign-out, and session management. It also defines the authentication providers, such as Google and custom credentials, and sets up callbacks for JWT token and session management

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 1 * 60 * 60, // 1 hour
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      const callbackUrl = new URL(url, baseUrl).searchParams.get('callbackUrl');
      return callbackUrl && callbackUrl.startsWith(baseUrl)
        ? callbackUrl
        : baseUrl;
    },
  },
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: 'consent',
    //       access_type: 'offline',
    //       response_type: 'code',
    //     },
    //   },
    // }),
    Credentials({
      authorize: async (credentials) => {
        // logic to verify if user exists in the database
        const parsedCredentials = z
          .object({ nationalId: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { nationalId, password } = parsedCredentials.data;
          const member = await prisma.members.findUnique({
            where: {
              nationalId: nationalId,
            },
          });
          if (!member) {
            throw new Error('Member not found. Please register to continue.');
          } else {
            // member found, check if passwords match
            const passwordsMatch = bcrypt.compareSync(
              password,
              member.password,
            );

            if (passwordsMatch) {
              return member;
            }
            throw new Error('Invalid password or credentials');
          }
        }
        return null;
      },
    }),
  ],
});
