"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: VoidFunction;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  console.error(error, "ERROR");

  return (
    <section className="w-full flex flex-col items-center">
      <Image
        {...{
          src: "/website-maintenance.gif",
          width: 500,
          height: 500,
          alt: "500-Error",
          priority: true,
          className: "relative bottom-20",
          unoptimized: true,
        }}
      />
      <div className="relative bottom-10 w-full flex flex-col items-center gap-6 bg-slate-200 dark:bg-slate-900 rounded-md py-10">
        <h1 className="text-3xl sm:text-4xl text-slate-900 dark:text-white underline text-center">
          Aconteceu algo não planejado!
        </h1>

        <div className="flex flex-row gap-6">
          <Link
            className="flex flex-row gap-2 bg-red-500 py-2 px-4 rounded hover:opacity-80 text-white duration-300"
            href="/"
          >
            <ArrowLeft />
            <span>Voltar</span>
          </Link>
          <Button onClick={reset}>Tente de Novo</Button>
        </div>
      </div>
    </section>
  );
}
