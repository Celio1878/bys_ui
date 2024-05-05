"use client";

import { Suspense } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MyBooksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-row items-center pt-10 pb-6">
        <h1 className="w-full text-4xl font-bold text-center">Meus Livros</h1>
        <Button className="absolute right-32 gap-2 items-center justify-center">
          <PlusIcon />
          Novo Livro
        </Button>
      </div>

      <div className="flex flex-wrap w-full items-center justify-center">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="p-4">
            <Image
              className={
                "cursor-pointer hover:scale-110 transition duration-700"
              }
              src={"/cover.jpg"}
              alt={"cover"}
              width={140}
              height={160}
              priority={true}
            />
          </div>
        ))}
      </div>
    </Suspense>
  );
}
