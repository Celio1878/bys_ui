"use client";

import { Loading } from "@/components/loading";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import { FollowComponent } from "@/components/follow-component";
import { Card } from "@/components/ui/card";
import { Book } from "@/components/book";
import { FollowButton } from "@/components/buttons/follow-button";
import { toast } from "@/components/ui/use-toast";
import { Frown, HandMetal, UserRoundMinus } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { ProfileDto } from "@/app/model/profile-dto";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { sanitizeTagList, Tag } from "@/app/model/tags";
import { Button } from "@/components/ui/button";

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export default function AuthorPage() {
  const { data: session } = useSession() as any;
  const { id } = useParams();

  const { data: authorProfile, mutate: getProfile } = useSWR(
    `${PROFILE_SERVICE_URL}/${id}`,
    fetcher<ProfileDto>({}).get,
  );

  const { data: userProfile } = useSWR(
    `${PROFILE_SERVICE_URL}/${session?.user.id}`,
    fetcher<ProfileDto>({}).get,
  );

  const followingTag: Tag<string> = {
    id: authorProfile?.id!,
    title: authorProfile?.name!,
  };

  const followerTag: Tag<string> = {
    id: userProfile?.id!,
    title: userProfile?.name!,
  };

  const followerDto: ProfileDto = {
    ...authorProfile!,
    followers: authorProfile?.followers.concat(followerTag)!,
  };

  const followingDto: ProfileDto = {
    ...userProfile!,
    following: userProfile?.following.concat(followingTag)!,
  };

  const { trigger: followerTrigger } = useSWRMutation(
    `${PROFILE_SERVICE_URL}/${id}`,
    fetcher<ProfileDto>({ body: followingDto!, token: session?.access_token })
      .put,
  );

  const { trigger: followingTrigger } = useSWRMutation(
    `${PROFILE_SERVICE_URL}/${userProfile?.id}`,
    fetcher<ProfileDto>({ body: followerDto!, token: session?.access_token })
      .put,
  );

  const alreadyFollowing = authorProfile?.followers.some(
    (follower) => follower.id === userProfile?.id,
  );

  function removeFollower() {
    const filteredFollowers = sanitizeTagList({
      tagList: authorProfile?.followers!,
      newTag: followerTag,
    });

    const filteredFollowing = sanitizeTagList({
      tagList: userProfile?.following!,
      newTag: followingTag,
    });

    const followerDto: ProfileDto = {
      ...authorProfile!,
      followers: filteredFollowers,
    };

    const followingDto: ProfileDto = {
      ...userProfile!,
      following: filteredFollowing,
    };

    Promise.all([
      fetcher<ProfileDto>({
        body: followerDto,
        token: session?.access_token,
      }).put(`${PROFILE_SERVICE_URL}/${userProfile?.id}`),
      fetcher<ProfileDto>({
        body: followingDto,
        token: session?.access_token,
      }).put(`${PROFILE_SERVICE_URL}/${id}`),
    ])
      .then(() => getProfile())
      .finally(() =>
        toast({
          description: (
            <p className="flex flex-row gap-2 items-center justify-center">
              <Frown /> Voce nao recebera atualizacoes de {authorProfile?.name!}
              .
            </p>
          ),
          className: "border border-red-500 bg-orange-500 text-white",
          type: "foreground",
        }),
      );
  }

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex flex-col items-center gap-4 pb-20">
        <Image
          className="rounded-full"
          src={`${authorProfile ? authorProfile.urlImage : "/user.png"}`}
          alt={`${authorProfile?.name} image`}
          width={150}
          height={150}
        />
        <h1 className="text-2xl font-bold">{authorProfile?.name}</h1>

        {session?.user.id !== authorProfile?.id &&
          (!alreadyFollowing ? (
            <FollowButton
              onClick={() =>
                Promise.all([followerTrigger(), followingTrigger()])
                  .then(() =>
                    toast({
                      description: (
                        <p className="flex flex-row gap-2 items-center justify-center">
                          <HandMetal /> Voce sera avisado quando esse perfil for
                          atualizado.
                        </p>
                      ),
                      type: "foreground",
                    }),
                  )
                  .finally(() => getProfile())
              }
            />
          ) : (
            <Button
              className="flex flex-row gap-1 text-white"
              variant={"destructive"}
              onClick={removeFollower}
            >
              <UserRoundMinus /> Seguir
            </Button>
          ))}

        <FollowComponent
          followers={authorProfile?.followers!}
          following={authorProfile?.following!}
        />
      </section>

      <h1 className="w-full text-3xl font-bold pb-4">
        Livros de {authorProfile?.name}
      </h1>

      {authorProfile
        ? authorProfile?.authorship?.length > 0 && (
            <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8 bg-zinc-50 dark:bg-neutral-950 dark:border-neutral-950">
              {authorProfile?.authorship.map((t, k) => {
                const href = `/books/${t.id}`;

                return <Book bookTag={t} href={href} key={k} />;
              })}
            </Card>
          )
        : null}
    </Suspense>
  );
}
