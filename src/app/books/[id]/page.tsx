"use client";

import { Loading } from "@/components/loading";
import { Suspense } from "react";
import { BookData } from "@/components/book/book-data";
import { BookChapters } from "@/components/book/book-chapters";
import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { BookDto } from "@/app/model/book-dto";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export default function BookPage() {
  const { id } = useParams();

  const { data: book } = useSWR(
    `${SERVICE_URL}/${id}`,
    fetcher<BookDto>({}).get,
  );

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full mb-8">
        <BreadcrumbComponent
          bookLink={`/books/${id}`}
          bookTitle={book?.title!}
        />
      </div>
      <BookData
        bookData={book!}
        chaptersComponent={<BookChapters chaptersTags={book?.chapters!} />}
      />
    </Suspense>
  );
}
