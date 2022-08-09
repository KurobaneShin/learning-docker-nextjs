import NextAuth from "next-auth/next";
import { User } from "./user";

type authUser = User & {
  role: string;
};

declare module "next-auth" {
  interface Session {
    user: authUser;
  }
}
