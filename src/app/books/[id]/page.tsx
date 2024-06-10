"use client";

import { Loading } from "@/components/loading";
import { Suspense, useContext } from "react";
import { BookData } from "@/components/book/book-data";
import { BookChapters } from "@/components/book/book-chapters";
import { BookContext } from "@/components/book-context";
import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { useParams } from "next/navigation";

export default function BookPage() {
  const { id } = useParams() as { id: string };
  const { book } = useContext(BookContext);

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full mb-8">
        <BreadcrumbComponent
          book_link={`/books/${id}`}
          book_title={book.title}
        />
      </div>
      <BookData
        book_data={book}
        chapters_component={<BookChapters chapters_tags={book.chapters} />}
      />
    </Suspense>
  );
}
