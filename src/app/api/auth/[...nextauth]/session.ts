import { DefaultSession, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

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
}
