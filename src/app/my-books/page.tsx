import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { MyBooksHeader } from "@/components/my-books-header";
import { Book } from "@/components/book";
import { UpdateBookButton } from "@/components/buttons/update-book-button";
import { Card } from "@/components/ui/card";

export default function MyBooksPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyBooksHeader />

      <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8">
        {Array.from({ length: 10 }).map((_, i) => {
          const title = "Livro " + i;
          const id = title.replace(/\s/g, "-").toLowerCase();
          const href = `/book/${id}`;

          return (
            <Book
              title={title}
              buttons={<UpdateBookButton />}
              key={i}
              href={href}
            />
          );
        })}
      </Card>
    </Suspense>
  );
}
