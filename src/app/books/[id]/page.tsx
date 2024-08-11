"use client";

import { Loading } from "@/components/loading";
import { Suspense } from "react";
import { BookData } from "@/components/book/book-data";
import { BookChapters } from "@/components/book/book-chapters";
import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { Story } from "@/app/model/story";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export default function BookPage() {
  const { id } = useParams() as { id: string };

  const { data: book, isLoading } = useSWR(
    `${SERVICE_URL}/book/${id}`,
    fetcher<Story>({}).get,
  );

  if (isLoading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full mb-8">
        <BreadcrumbComponent
          book_link={`/books/${id}`}
          book_title={book?.title!}
        />
      </div>
      <BookData
        bookData={book!}
        chaptersComponent={<BookChapters chapters_tags={book?.chapters!} />}
      />
    </Suspense>
  );
}
