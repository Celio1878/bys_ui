import { fetcher } from "@/hooks/fetcher";
import { ProfileDto } from "@/app/model/profile-dto";

const SERVICE_URL = process.env.NEXT_PUBLIC_PROFILES_API_URL;

export async function getProfile(id: string): Promise<ProfileDto> {
  return await fetcher<ProfileDto>({}).get(`${SERVICE_URL}/${id}`);
}
