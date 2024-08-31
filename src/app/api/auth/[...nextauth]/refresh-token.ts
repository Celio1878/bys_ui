import { JWT } from "next-auth/jwt";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN_URL = process.env.REFRESH_TOKEN_URL;

export async function refreshToken(token: JWT) {
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
    ...responseTokens,
    id_token: responseTokens.id_token,
    expires_at: token.expires_at,
    refresh_token: responseTokens.refresh_token ?? token.refresh_token,
  };
}
