import NextAuth, { DefaultSession, NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import type { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env';
import userService from '@/services/user-service';
import {
  accountTable,
  authenticatorTable,
  sessionTable,
  userTable,
  verificationTokenTable,
} from '@/db/schema';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: userTable,
    accountsTable: accountTable,
    sessionsTable: sessionTable,
    verificationTokensTable: verificationTokenTable,
    authenticatorsTable: authenticatorTable,
  }) as Adapter,
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const dbUser = await userService.getUserByEmail(token.email!);

      if (!dbUser) {
        throw new Error('no user with email found');
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name ?? '',
          email: token.email ?? '',
          image: token.picture,
          emailVerified: token.emailVerified as Date,
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
