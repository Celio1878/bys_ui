"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { SearchSectionTitle } from "@/components/search-section-title";
import { PaginationComponent } from "@/components/pagination-component";
import { Card } from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { Book } from "@/components/book";

const SEARCH_SERVICE_URL = process.env.NEXT_PUBLIC_BOOKS_API_URL!;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text") as string;
  const page = searchParams.get("page");
  const pathname = usePathname();

  const { data } = useSWR(SEARCH_SERVICE_URL, fetcher<any[]>({}).get);

  const booksByFilter = data?.filter((book) => book.genre.id === text);

  if (!booksByFilter?.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <SearchSectionTitle title={text} />
        <h1 className="text-2xl font-bold">
          Nao foram encontrados conteudos com essa pesquisa
        </h1>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className=" flex flex-col gap-4">
        <SearchSectionTitle title={text} />

        <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8 bg-zinc-50 dark:bg-neutral-950 dark:border-neutral-950">
          {booksByFilter?.map((book, k) => {
            const href = `/books/${book?.id}`;

            return <Book bookTag={book} href={href} key={k} />;
          })}
        </Card>

        <PaginationComponent
          {...{ page: Number(page), pathname, text, total: booksByFilter }}
        />
      </div>
    </Suspense>
  );
}
