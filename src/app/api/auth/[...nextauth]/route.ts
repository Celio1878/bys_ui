import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

const auth_options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: `${google_client_id}`,
      clientSecret: `${google_client_secret}`,
      allowDangerousEmailAccountLinking: false,

      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account) {
        token.account = account;
      }

      return {
        ...user,
        ...token,
      };
    },
    session: async ({ session, token }) => {
      return {
        ...token,
        ...session,
      };
    },
    redirect: async () => "/",
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/", signOut: "/", error: "/api/auth/error" },
};

const handler = NextAuth(auth_options);
export { handler as GET, handler as POST };
