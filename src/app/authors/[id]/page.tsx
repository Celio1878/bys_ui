"use client";

import { Loading } from "@/components/loading";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import { UserImage } from "@/components/user-image";
import { FollowComponent } from "@/components/follow-component";
import { Card } from "@/components/ui/card";
import { Book } from "@/components/book";
import { users } from "@/utils/mocks";
import { FollowButton } from "@/components/buttons/follow-button";
import { toast } from "@/components/ui/use-toast";
import { HandMetal } from "lucide-react";

export default function AuthorPage() {
  const { id } = useParams() as { id: string };

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex flex-col items-center gap-4 pb-20">
        <UserImage width={150} height={150} />
        <h1 className="text-2xl font-bold">Autor {id}</h1>
        <FollowButton
          on_click={() => {
            return toast({
              description: (
                <p className="flex flex-row gap-2 items-center justify-center">
                  Seguindo ${id} <HandMetal />
                </p>
              ),
              type: "foreground",
            });
          }}
        />
        <FollowComponent followers={users} following={users} />
      </section>

      <h1 className="w-full text-4xl font-bold pb-4">Livros de {id}</h1>

      <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8 bg-zinc-50 dark:bg-neutral-950 dark:border-neutral-950">
        {Array.from({ length: 10 }).map((_, i) => {
          const title = "Livro " + i;
          const id = title.replace(/\s/g, "-").toLowerCase();
          const href = `/books/${id}`;

          return <Book title={title} key={i} href={href} />;
        })}
      </Card>
    </Suspense>
  );
}
