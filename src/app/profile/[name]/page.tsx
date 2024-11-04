"use client";

import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { MyBooksHeader } from "@/components/my-books-header";
import { Book } from "@/components/book";
import { Card } from "@/components/ui/card";
import { BookDrawer } from "@/components/book-drawer";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { UserImage } from "@/components/user-image";
import { FollowComponent } from "@/components/follow-component";
import { fetcher } from "@/hooks/fetcher";
import useSWR from "swr";
import { ProfileDto, removeAuthorship } from "@/app/model/profile-dto";
import { UpdateBookButtonLabel } from "@/components/buttons/update-book-button-label";
import { DeleteButton } from "@/components/buttons/delete-button";
import { useBookApi } from "@/hooks/use-book-api";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { RemoveChapterToast } from "@/components/remove-chapter-toast";

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export default function ProfilePage() {
  const pathname = usePathname();
  const { data: session } = useSession() as any;
  const { deleteBook } = useBookApi();

  const { data: profile, mutate: getProfile } = useSWR(
    `${PROFILE_SERVICE_URL}/${session?.user?.id}`,
    fetcher<ProfileDto>({ token: session?.access_token }).get,
  );

  const { trigger: deleteAccount } = useSWRMutation(
    `${PROFILE_SERVICE_URL}/${profile?.id}?name=${profile?.name}`,
    fetcher({ token: session?.access_token }).delete,
  );

  function deleteBooks() {
    const books = profile?.authorship || [];
    return Promise.all(books.map((t) => deleteBook(t.id)));
  }

  return (
    <Suspense fallback={<Loading />}>
      <section
        className="flex flex-col items-center gap-4 pb-20"
        title={"Perfil"}
      >
        <UserImage width={150} height={150} />
        <div className="flex flex-row gap-x-4 items-center">
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
          <Button
            size={"sm"}
            variant="destructive"
            title="Remover Conta"
            id="delete-account-button"
            onClick={async () =>
              toast({
                title: `Tem certeza?`,
                description: "Essa ação não pode ser desfeita.",
                className: "border border-red-500",
                type: "foreground",
                role: "alert",
                action: (
                  <RemoveChapterToast
                    onRemove={async () => {
                      try {
                        await deleteBooks();
                        await deleteAccount();
                      } catch (error) {
                        console.error("Error during deletion:", error);
                      } finally {
                        await signOut();
                      }
                    }}
                  />
                ),
              })
            }
          >
            <Trash2 size={20} />
          </Button>
        </div>
        <FollowComponent
          followers={profile?.followers || []}
          following={profile?.following || []}
        />
      </section>
      <MyBooksHeader profile={profile!} onConfirmClick={getProfile} />

      {profile
        ? profile?.authorship?.length > 0 && (
            <Card className="flex flex-wrap w-full items-center justify-center gap-x-2 gap-y-10 py-8 bg-zinc-50 dark:bg-neutral-950 dark:border-neutral-950">
              {profile?.authorship.map((t, k) => (
                <Book
                  bookTag={t}
                  buttons={
                    <div className="flex flex-row gap-6 mt-2">
                      <BookDrawer
                        profile={profile}
                        buttonLabel={<UpdateBookButtonLabel />}
                        modalTitle="Editar Livro"
                        bookId={t.id}
                        onConfirmClick={getProfile}
                      />
                      <DeleteButton
                        onClick={async () => {
                          const authorship = removeAuthorship(profile, t.id);
                          await Promise.all([
                            deleteBook(t.id),
                            fetcher({
                              body: authorship,
                              token: session?.access_token,
                            }).put(`${PROFILE_SERVICE_URL}/${profile?.id}`),
                          ]).then(() => getProfile());
                        }}
                      />
                    </div>
                  }
                  key={k}
                  href={`${pathname}/books/${t.id}`}
                />
              ))}
            </Card>
          )
        : null}
    </Suspense>
  );
}
