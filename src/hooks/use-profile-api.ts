import { CreateProfileDto, ProfileDto } from "@/app/model/profile-dto";
import { fetcher } from "@/hooks/fetcher";

const PROFILES_API_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export async function create_profile(dto: CreateProfileDto, token: string) {
  return await fetcher<CreateProfileDto>({ body: dto, token }).post(
    PROFILES_API_URL,
  );
}

export async function get_profile(email: string) {
  return await fetcher<ProfileDto>({}).get(`${PROFILES_API_URL}/${email}`);
}

// export function useGetProfile(email: string) {
//   return useSWR(`${PROFILES_API_URL}/${email}`, fetcher<ProfileDto>().get);
// }
//
// export function useGetProfiles() {
//   return useSWR(PROFILES_API_URL, fetcher<ProfileDto[]>().get);
// }
