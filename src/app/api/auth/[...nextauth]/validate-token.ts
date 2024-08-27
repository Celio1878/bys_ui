import { refreshToken } from "@/app/api/auth/[...nextauth]/refresh-token";
import { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

interface Profile {
  sub?: string;
  name?: string;
  email?: string;
  image?: string;
}

interface TokenParams {
  token: JWT;
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: "signIn" | "signUp" | "update";
  isNewUser?: boolean;
  session?: any;
}

export async function validateToken({ token, account, profile }: TokenParams) {
  if (account) {
    return {
      ...account,
      ...token,
      ...profile,
    };
  } else if (Date.now() < token.expires_at * 1000) {
    return token;
  }

  if (!token.refresh_token) throw new Error("Missing refresh token");

  return refreshToken({ token, account, profile });
}
