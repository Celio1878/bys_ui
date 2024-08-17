import type { User } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fetcher } from "@/hooks/fetcher";
import { CreateProfileDto, ProfileDto } from "@/app/model/profile-dto";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVICE_URL = process.env.NEXT_PUBLIC_PROFILES_API_URL;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: false,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
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

      try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID!,
            client_secret: GOOGLE_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token!,
          }),
        });

        const responseTokens = await response.json();

        if (!response.ok) {
          throw new Error(
            `Refresh token error: ${responseTokens.error_description}`,
          );
        }

        return {
          ...token,
          access_token: responseTokens.access_token,
          expires_at: Math.floor(
            Date.now() / 1000 + (responseTokens.expires_in as number),
          ),
          refresh_token: responseTokens.refresh_token ?? token.refresh_token,
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" as const };
      }
    },
    session: async ({ session, token }) => {
      const user: User = {
        id: token.sub!,
        name: token.name,
        email: token.email,
        image: token.picture,
      };
      session.user = user;

      return {
        ...session,
        access_token: token.id_token,
        expires_at: token.expires_at,
      };
    },
    signIn: async ({ user, account }) => {
      if (account && user) {
        try {
          const profile = await fetcher<ProfileDto>({}).get(
            `${SERVICE_URL}/profile/${user.email}`,
          );

          if (!profile.id && !profile.name) {
            const dto = {
              id: String(user.id),
              email: String(user.email),
              name: String(user.name),
              urlImage: String(user.image),
            };

            await fetcher<CreateProfileDto>({
              body: dto,
              token: account?.id_token,
            }).put(`${SERVICE_URL}/profile`);

            return true;
          }
        } catch (error) {
          console.error(error);

          return false;
        }
      }
      return true;
    },
    redirect: async () => "/",
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/", signOut: "/", error: "/api/auth/error" },
});

export { handler as GET, handler as POST };

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
