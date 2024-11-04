import { FC } from "react";
import { ProfileDto } from "@/app/model/profile-dto";
import { ProfileCard } from "@/components/main-profile-card";

export const MainProfilesSection: FC<{ profiles: ProfileDto[] }> = ({
  profiles,
}) => {
  return (
    <section className="w-full flex flex-col gap-8 justify-center items-center mt-28">
      <h1 className="font-bold text-3xl underline underline-offset-4">
        Principais Autores
      </h1>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {profiles?.map((profile) => (
          <ProfileCard key={profile.id} profile={profile!} />
        ))}
      </div>
    </section>
  );
};
