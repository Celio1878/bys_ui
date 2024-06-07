"use client";

import { Loading } from "@/components/loading";
import { Suspense, useContext } from "react";
import { BookData } from "@/components/book/book-data";
import { BookChapters } from "@/components/book/book-chapters";
import { BookContext } from "@/components/book-context";

export default function BookPage() {
  const { book } = useContext(BookContext);

  return (
    <Suspense fallback={<Loading />}>
      <BookData
        book_data={book}
        chapters_component={<BookChapters chapters_tags={book.chapters} />}
      />
    </Suspense>
  );
}
