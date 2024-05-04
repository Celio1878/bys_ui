"use client";

import { Banner } from "@/components/banner";
import { Books } from "@/components/books";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="">
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
      </div>
    </>
  );
}
