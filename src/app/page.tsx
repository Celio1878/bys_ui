"use client";

import { Banner } from "@/components/banner";
import { Books } from "@/components/books";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Banner />
      <div className="flex flex-col gap-20">
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
      </div>
    </Suspense>
  );
}
