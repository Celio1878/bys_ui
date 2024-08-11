"use client";

import { Suspense, useEffect, useState } from "react";
import { Loading } from "@/components/loading";
import { MyBooksHeader } from "@/components/my-books-header";
import { Book } from "@/components/book";
import { Card } from "@/components/ui/card";
import { BookDrawer } from "@/components/book-drawer";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserImage } from "@/components/user-image";
import { FollowComponent } from "@/components/follow-component";
import { fetcher } from "@/hooks/fetcher";
import useSWR from "swr";
import { ProfileDto } from "@/app/model/profile-dto";
import { FilePenLine, Trash2 } from "lucide-react";

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);
const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export default function ProfilePage() {
  const { data: session } = useSession() as any;
  const pathname = usePathname();
  const [updatePage, updatePageState] = useState(false);

  const {
    data: profile,
    isLoading,
    mutate,
  } = useSWR(
    `${PROFILE_SERVICE_URL}/profile?id=${session?.user?.email}`,
    fetcher<ProfileDto>({}).get,
  );

  useEffect(() => {
    if (updatePage) {
      mutate()
        .then(() => console.log("Updated Page"))
        .catch((e) => console.error(e));
      updatePageState(false);
    }
  }, [updatePage]);

  if (isLoading) return <Loading />;

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
      <MyBooksHeader bookCreated={() => updatePageState(true)} />

      {profile
        ? profile?.myStories?.length > 0 && (
            <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8 bg-zinc-50 dark:bg-neutral-950 dark:border-neutral-950">
              {profile?.myStories.map((t, k) => {
                const href = `${pathname}/books/${t.id}`;

                return (
                  <Book
                    title={t.title}
                    buttons={
                      <div className="flex flex-row gap-6 mt-2">
                        <BookDrawer
                          buttonLabel={
                            <div id="update-book" title={"Editar Livro"}>
                              <FilePenLine className="text-violet-600 dark:text-violet-300 hover:opacity-75 transition-all duration-200" />
                            </div>
                          }
                          buttonType="outline"
                          modalTitle="Editar Livro"
                          id={t.id}
                          bookCreated={() => updatePageState(true)}
                        />
                        <button
                          id={t.id}
                          title={"Deletar Livro"}
                          onClick={async () => {
                            await fetcher({
                              token: session?.access_token,
                            }).delete(`${BOOK_SERVICE_URL}/book/${t.id}`);

                            updatePageState(true);
                          }}
                        >
                          <Trash2 className="w-5 h-5 text-red-500 hover:opacity-70" />
                        </button>
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
