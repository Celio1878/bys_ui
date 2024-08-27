"use client";

import {Loading} from "@/components/loading";
import {Suspense} from "react";
import {useParams} from "next/navigation";
import {FollowComponent} from "@/components/follow-component";
import {Card} from "@/components/ui/card";
import {Book} from "@/components/book";
import {FollowButton} from "@/components/buttons/follow-button";
import {toast} from "@/components/ui/use-toast";
import {HandMetal} from "lucide-react";
import useSWR from "swr";
import {fetcher} from "@/hooks/fetcher";
import {ProfileDto} from "@/app/model/profile-dto";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import {useSession} from "next-auth/react";
import {Tag} from "@/app/model/story";

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export default function AuthorPage() {
  const { data: session } = useSession() as any;
  const { id } = useParams();

  const { data: profile, mutate: getProfile } = useSWR(
    `${PROFILE_SERVICE_URL}/${id}`,
    fetcher<ProfileDto>({})get,
  )

  const profileTag: Tag<string> = {
    id: session?.user?.id,
    title: session?.usr?.name,
  };

  const dto: ProfileDto = {
    ...profile!,
    followers: profile?.followers.concat(profileTag)!
  };

  const { trigger } = useSWRMutation(
    `${PROFILE_SERVICE_URL}/${id}`,
    fetcher<ProfileDto>({ body: dto!, token: session?.access_tokn }).put
  );

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex flex-col items-center gap-4 pb-20">
        <Image
          className="rounded-full"
          {...{
            src: profile ? profile.urlImage : "/user.png",
            alt: "Profile Image",
            width: 150,
            height: 150,
            priority: true,
            quality: 100
          }}
        />
        <h1 className="text-2xl font-bold">{profile?.name}</h1>
        {session?.user.id !== profile?.id && (
          <FollowButton
            on_click={() => {
              trigger()
                .then(() =>
                  toast({
                    description: (
                      <p className="flex flex-row gap-2 items-center justify-center">
                        <HandMetal /> Voce sera avisado quando esse perfil for
                        atualizado.
                      </p>
                    ),
                    className: "border border-red-500 bg-orange-500 text-white",
                    type: "foreground"
                  }),
                )
                .finally(() => getProfile());
            }}
          />
        )}

        <FollowComponent
          followers={profile?.followers!}
          following={profile?.following!}
        />
      </section>

      <h1 className="w-full text-3xl font-bold pb-4">
        Livros de {profile?.name}
      </h1>

      {profile
        ? profile?.myStories?.length > 0 && (
            <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8 bg-zinc-50 dark:bg-neutral-950 dark:border-neutral-950">
              {profile?.myStories.map((tag, k) => {
                const href = `/books/${tag.id}`;

                return <Book bookTag={tag} href={href} key={k} />;
              })}
            </Card>
          )
        : null}
    </Suspense>
  );
}
