import type { Account, User } from "next-auth";
import { fetcher } from "@/hooks/fetcher";
import { CreateProfileDto } from "@/app/model/profile-dto";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);
const GOOGLE_SIGNIN_ORIGIN = String(
  process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_ORIGIN,
);

export async function createProfile(
  account: Account,
  user: User,
): Promise<boolean> {
  const headers = {
    Origin: GOOGLE_SIGNIN_ORIGIN,
    Authorization: `Bearer ${account?.id_token}`,
  };

  const dto: CreateProfileDto = {
    id: String(user.id),
    email: String(user.email),
    name: String(user.name),
    bio: "",
    urlImage: String(user.image),
  };

  await fetcher<CreateProfileDto>({
    body: dto,
    token: account?.id_token,
    headers,
  }).post(SERVICE_URL);

  return true;
}
