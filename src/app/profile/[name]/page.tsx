"use client";

import {Suspense} from "react";
import {Loading} from "@/components/loading";
import {MyBooksHeader} from "@/components/my-books-header";
import {Book} from "@/components/book";
import {Card} from "@/components/ui/card";
import {BookDrawer} from "@/components/book-drawer";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {UserImage} from "@/components/user-image";
import {FollowComponent} from "@/components/follow-component";
import {fetcher} from "@/hooks/fetcher";
import useSWR from "swr";
import {ProfileDto} from "@/app/model/profile-dto";
import {UpdateBookButtonLabel} from "@/components/buttons/update-book-button-label";
import {DeleteButton} from "@/components/buttons/delete-button";
import {useBookApi} from "@/hooks/useBookApi";

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export default function ProfilePage() {
  const pathname = usePathname();
  const { data: session } = useSession() as any;
  const { deleteBook } = useBookApi();
  
  const {data: profile, mutate: getProfile} = useSWR(
    `${PROFILE_SERVICE_URL}/${session?.user?.id}`,
    fetcher<ProfileDto>({token: session?.access_token})get,
  )

  return (
    <Suspense fallback={<Loading />}>
      <section
        className="flex flex-col items-center gap-4 pb-20"
        title={"Perfil"}
      >
        <UserImage width={150} height={150} />
        <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
        <FollowComponent
          followers={profile?.followers || []}
          following={profile?.following || []}
        />
      </section>
      <MyBooksHeader onConfirmClick={getProfile}/>

      {profile
        ? profile?.myStories?.length > 0 && (
            <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8 bg-zinc-50 dark:bg-neutral-950 dark:border-neutral-950">
              {profile?.myStories.map((tag, k) => {
                const href = `${pathname}/books/${tag.id}`;

                return (
                  <Book
                    bookTag={tag}
                    buttons={
                      <div className="flex flex-row gap-6 mt-2">
                        <BookDrawer
                          buttonLabel={<UpdateBookButtonLabel/>}
                          modalTitle="Editar Livro"
                          bookId={tag.id}
                          onConfirmClick={getProfile}
                        />
                        <DeleteButton
                          onClick={() =>
                            deleteBook(tag.id).then(() => getProfile())
                          }
                        />
                      </div>
                    }
                    key={k}
                    href={href}
                  />
                );
              })}
            </Card>
          )
        : null}
    </Suspense>
  );
}
