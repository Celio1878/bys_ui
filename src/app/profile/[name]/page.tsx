"use client";

import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { MyBooksHeader } from "@/components/my-books-header";
import { Book } from "@/components/book";
import { Card } from "@/components/ui/card";
import { BookDrawer } from "@/components/book-drawer";
import { UpdateButtonLabel } from "@/components/buttons/update-button-label";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserImage } from "@/components/user-image";
import { FollowComponent } from "@/components/follow-component";

export default function ProfilePage() {
  const { data: session } = useSession() as any;
  const pathname = usePathname();

  return (
    <Suspense fallback={<Loading />}>
      <section
        className="flex flex-col items-center gap-4 pb-20"
        title={"Perfil"}
      >
        <UserImage width={150} height={150} />
        <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
        <FollowComponent />
      </section>

      <MyBooksHeader />

      <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8">
        {Array.from({ length: 10 }).map((_, i) => {
          const title = "Livro " + i;
          const id = title.replace(/\s/g, "-").toLowerCase();
          const href = `${pathname}/book/${id}`;

          return (
            <Book
              title={title}
              buttons={
                <BookDrawer
                  button_label={<UpdateButtonLabel />}
                  button_type="outline"
                  modal_title="Editar Livro"
                  id={id}
                />
              }
              key={i}
              href={href}
            />
          );
        })}
      </Card>
    </Suspense>
  );
}
