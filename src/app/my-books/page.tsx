"use client";

import { FilePenLine, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";

export default function MyBooksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-row items-center pt-10 pb-6">
        <h1 className="w-full text-4xl font-bold text-center">Meus Livros</h1>
        <Button className="absolute right-5 sm:right-32 sm:gap-2 items-center justify-center">
          <PlusIcon />
          <p className="hidden sm:block">Novo Livro</p>
        </Button>
      </div>

      <div className="flex flex-wrap w-full items-center justify-center">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col w-[10rem] gap-4 p-4">
            <Image
              className={
                "cursor-pointer hover:scale-105 transition duration-700"
              }
              src={"/cover.jpg"}
              alt={"cover"}
              width={140}
              height={160}
              priority={true}
            />

            <h3>Titulo</h3>
            <Button
              variant="secondary"
              className="flex flex-row justify-center items-center gap-2"
            >
              <FilePenLine />
              <p>Editar</p>
            </Button>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
