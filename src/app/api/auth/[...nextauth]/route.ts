import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "@/app/api/auth/[...nextauth]/signIn";
import { getSession } from "@/app/api/auth/[...nextauth]/session";
import { validateToken } from "@/app/api/auth/[...nextauth]/validate-token";

const GOOGLE_CLIENT_ID = String(process.env.GOOGLE_CLIENT_ID);
const GOOGLE_CLIENT_SECRET = String(process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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
    jwt: validateToken,
    session: getSession,
    signIn: signIn,
    redirect: async () => "/",
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/", signOut: "/", error: "/api/auth/error" },
});

export { handler as GET, handler as POST };

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
