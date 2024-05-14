import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { MyBooksHeader } from "@/components/my-books-header";
import { Book } from "@/components/book";
import { UpdateBookButton } from "@/components/update-book-button";
import { Card } from "@/components/ui/card";

export default function MyBooksPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyBooksHeader />

      <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <Book title={"Title"} buttons={<UpdateBookButton />} key={i} />
        ))}
      </Card>
    </Suspense>
  );
}
