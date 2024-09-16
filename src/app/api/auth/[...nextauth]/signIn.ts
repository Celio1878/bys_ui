import { getProfile } from "@/app/api/auth/[...nextauth]/get-profile";
import { createProfile } from "@/app/api/auth/[...nextauth]/create-profile";
import { Account, User } from "next-auth";
import { CredentialInput } from "next-auth/providers/credentials";

interface Profile {
  sub?: string;
  name?: string;
  email?: string;
  image?: string;
}

interface SignInParams {
  user: User;
  account: Account | null;
  profile?: Profile | undefined;
  email?:
    | {
        verificationRequest?: boolean | undefined;
      }
    | undefined;
  credentials?: Record<string, CredentialInput>;
}

export async function signIn({ user, account }: SignInParams) {
  if (account && user) {
    try {
      const profile = await getProfile(user.id!);

      if (!profile) {
        await createProfile(account, user);
      }
    } catch (error) {
      console.error(error);

      return false;
    }
  }
  return true;
}
