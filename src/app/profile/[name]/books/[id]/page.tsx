"use client";

import { Loading } from "@/components/loading";
import { Suspense, useContext } from "react";
import { BookData } from "@/components/book/book-data";
import { MyBookChapters } from "@/components/book/my-book-chapters";
import { BookContext } from "@/components/book-context";

export default function MyBookPage() {
  const { book } = useContext(BookContext);

  return (
    <Suspense fallback={<Loading />}>
      <BookData
        book_data={book}
        chapters_component={<MyBookChapters chapters_tags={book.chapters} />}
      />
    </Suspense>
  );
}
