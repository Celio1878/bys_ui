"use client";

import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { MyBooksHeader } from "@/components/my-books-header";
import { Book } from "@/components/book";
import { Card } from "@/components/ui/card";
import { BookDrawer } from "@/components/book-drawer";
import { UpdateButtonLabel } from "@/components/buttons/update-button-label";

export default function MyBooksPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyBooksHeader />

      <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8">
        {Array.from({ length: 10 }).map((_, i) => {
          const title = "Livro " + i;
          const id = title.replace(/\s/g, "-").toLowerCase();
          const href = `/my-books/book/${id}`;

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
