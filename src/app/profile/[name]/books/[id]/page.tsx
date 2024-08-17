"use client";

import { Loading } from "@/components/loading";
import { Suspense } from "react";
import { BookData } from "@/components/book/book-data";
import { MyBookChapters } from "@/components/book/my-book-chapters";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { Story } from "@/app/model/story";
import { useParams } from "next/navigation";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export default function MyBookPage() {
  const { id } = useParams();

  const { data: book, isLoading } = useSWR(
    `${SERVICE_URL}/${id}`,
    fetcher<Story>({}).get,
  );

  if (isLoading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <BookData
        bookData={book!}
        chaptersComponent={<MyBookChapters chaptersTags={book?.chapters!} />}
      />
    </Suspense>
  );
}
