import { DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { getProfile } from "@/app/api/auth/[...nextauth]/get-profile";

interface SessionParams {
  session: DefaultSession;
  token: JWT;
  user: AdapterUser;
}

interface NewSessionParams {
  newSession: any;
  trigger: "update";
}

export async function getSession({
  session,
  token,
}: SessionParams & NewSessionParams) {
  const profile = await getProfile(token.sub!);

  const user = {
    id: token.sub!,
    name: profile.name,
    username: profile.username,
    email: token.email,
    image: profile.urlImage,
  };
  session.user = user;

  return {
    ...session,
    access_token: token.id_token,
    expires_at: token.expires_at,
  };
}
