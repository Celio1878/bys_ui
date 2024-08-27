import { JWT } from "next-auth/jwt";
import { Account } from "next-auth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN_URL = process.env.REFRESH_TOKEN_URL;

interface Profile {
  sub?: string;
  name?: string;
  email?: string;
  image?: string;
}

interface RefreshTokenParams {
  token: JWT;
  account: Account | null;
  profile?: Profile | undefined;
}

export async function refreshToken({
  token,
  account,
  profile,
}: RefreshTokenParams) {
  const response = await fetch(REFRESH_TOKEN_URL!, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID!,
      client_secret: GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token!,
    }),
  });

  if (!response.ok) {
    return { ...token, error: "RefreshAccessTokenError" as const };
  }

  const responseTokens = await response.json();

  return {
    ...token,
    ...profile,
    ...account,
    access_token: responseTokens.access_token,
    expires_at: Math.floor(
      Date.now() / 1000 + (responseTokens.expires_in as number),
    ),
    refresh_token: responseTokens.refresh_token ?? token.refresh_token,
  };
}
