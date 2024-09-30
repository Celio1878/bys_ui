import { fetcher } from "@/hooks/fetcher";
import { ProfileDto } from "@/app/model/profile-dto";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);
const GOOGLE_SIGNIN_ORIGIN = String(process.env.GOOGLE_SIGNIN_ORIGIN);

export async function getProfile(id: string): Promise<ProfileDto> {
  const headers = {
    Origin: GOOGLE_SIGNIN_ORIGIN,
  };

  return await fetcher<ProfileDto>({ headers }).get(`${SERVICE_URL}/${id}`);
}
