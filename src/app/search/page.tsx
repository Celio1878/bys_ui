"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { SearchSectionTitle } from "@/components/search-section-title";
import { PaginationComponent } from "@/components/pagination-component";
import { Book } from "@/components/book";
import { Card } from "@/components/ui/card";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text") as string;
  const page = searchParams.get("page");
  const pathname = usePathname();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-4">
        <SearchSectionTitle title={text} />

        <Card className="flex flex-wrap w-full items-center justify-center gap-8 py-8">
          {Array.from({ length: 10 }).map((_, i) => {
            const title = `Livro ${i + 1}`;
            const id = title.replace(/\s/g, "-").toLowerCase();
            const href = `/books/${id}`;

            return <Book title={title} key={i} href={href} />;
          })}
        </Card>

        <PaginationComponent {...{ page: Number(page), pathname, text }} />
      </div>
    </Suspense>
  );
}
