"use client";

import { BannerCarousel } from "@/components/carousel/banner-carousel";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { BooksCarousel } from "@/components/carousel/books-carousel";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import GlobalError from "@/app/global-error";
import { GenreTags, Story } from "@/app/model/story";

const SERVICE_URL = process.env.NEXT_PUBLIC_BOOKS_API_URL!;

export default function Home() {
  const { data, error, mutate } = useSWR(
    `${SERVICE_URL}/books`,
    fetcher<Story[]>({}).get,
  );

  if (error) return <GlobalError error={error} reset={mutate} />;

  return (
    <Suspense fallback={<Loading />}>
      <BannerCarousel />
      <section className="flex flex-col gap-20">
        <BooksCarousel
          key={"highlighted"}
          sectionTitle={"Destaque"}
          books={data!}
        />
        {GenreTags.map((section) => {
          const books = data?.filter((book) => book.genre.id === section.id);

          if (!books || books.length === 0) return null;

          return (
            <BooksCarousel
              key={section.id}
              sectionTitle={section.title}
              books={books}
            />
          );
        })}
      </section>
    </Suspense>
  );
}
