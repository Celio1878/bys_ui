"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { SearchSectionTitle } from "@/components/search-section-title";
import { Card } from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { SearchDto } from "@/app/model/search-dto";
import { Book } from "@/components/book";
import { PaginationComponent } from "@/components/pagination-component";
import Image from "next/image";
import Link from "next/link";

const SERVICE_URL = process.env.NEXT_PUBLIC_SEARCH_API_URL!;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text") as string;
  const page = searchParams.get("page");
  const pathname = usePathname();

  const { data } = useSWR(
    `${SERVICE_URL}?text=${text}&page=${page}`,
    fetcher<SearchDto>({}).get,
  );

  if (data?.books?.length! === 0 && data?.profiles?.length! === 0) {
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
      <div className="w-full flex flex-col gap-4">
        <SearchSectionTitle title={text} />

        <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8 bg-zinc-50 dark:bg-neutral-950 dark:border-neutral-950">
          {data?.books?.map((b, k) => {
            const href = `/books/${b?.id}`;
            return <Book bookTag={b} href={href} key={k} />;
          })}
          {data?.profiles?.map((p, k) => {
            const href = `/authors/${p?.id}`;
            return (
              <Link
                className="hover:underline hover:font-semibold transition-all duration-150"
                key={k}
                href={href}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Image
                    className="rounded-full"
                    src={p.urlImage}
                    alt={p.name}
                    width={100}
                    height={100}
                  />
                  {p.name}
                </div>
              </Link>
            );
          })}
        </Card>

        <PaginationComponent
          {...{
            page: Number(page),
            pathname,
            text,
            totalPages: data?.totalPages,
          }}
        />
      </div>
    </Suspense>
  );
}
