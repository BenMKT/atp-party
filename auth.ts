// Purpose: This file is responsible for handling authentication and authorization logic in the application. It uses NextAuth to provide authentication services to the application, including sign-in, sign-out, and session management. It also defines the authentication providers, such as Google and custom credentials, and sets up callbacks for JWT token and session management
import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

declare module 'next-auth' {
  /**
   * Extends the built-in session/user types to include the role property
   */
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      role?: string;
    } & DefaultSession['user'];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 2, // 2 hours
  },
  jwt: {
    maxAge: 60 * 60 * 2, // 2 hours
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
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
    Credentials({
      authorize: async (credentials) => {
        try {
          // logic to verify if user exists in the database
          const parsedCredentials = z
            .object({ nationalId: z.string(), password: z.string().min(4) })
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
              throw new Error('Invalid password!');
            }
          }
          return null;
        } catch (error) {
          console.error('Error in authorize function:', error);
          throw error;
        }
      },
    }),
  ],
});
