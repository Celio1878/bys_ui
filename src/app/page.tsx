"use client";

import { BannerCarousel } from "@/components/banner-carousel";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { book_sections } from "@/utils/book_sections";
import { BooksCarousel } from "@/components/books-carousel";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <BannerCarousel />
      <section className="flex flex-col gap-20">
        {book_sections.map((section, i) => (
          <BooksCarousel key={i} section_title={section.title} />
        ))}
      </section>
    </Suspense>
  );
}
