"use client";

import { Loading } from "@/components/loading";
import { Suspense } from "react";
import { BookData } from "@/components/book/book-data";
import { MyBookChapters } from "@/components/book/my-book-chapters";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { BookDto } from "@/app/model/book-dto";
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export default function MyBookPage() {
  const { id, name } = useParams();
  const { data: session } = useSession() as any;

  const normalized_name = session?.user?.name
    ?.trim()
    .toLowerCase()
    .replaceAll(" ", "-");

  const { data: book, isLoading } = useSWR(
    `${SERVICE_URL}/${id}`,
    fetcher<BookDto>({}).get,
  );

  if (normalized_name !== name) {
    return redirect(`https://www.beyourstories.com.br/books/${id}`);
  }

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
