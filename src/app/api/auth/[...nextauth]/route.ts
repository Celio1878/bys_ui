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
    jwt: async ({ token, user }) => ({ ...user, ...token }),
    session: async ({ session, token }) => ({ ...token, ...session }),
    redirect: async () => "/",
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/", signOut: "/" },
};

const handler = NextAuth(auth_options);
export { handler as GET, handler as POST };
