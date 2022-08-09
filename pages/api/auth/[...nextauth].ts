import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../../../services/users";
import { authUser } from "../../../types/next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials.email && credentials.password) {
          const user = await api.getUserFromEmail(credentials.email);

          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              active: user.active,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as authUser;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signIn",
  },
};

export default NextAuth(authOptions);
