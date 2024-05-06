"use client";

import Image from "next/image";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error;
  reset: VoidFunction;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  console.error(error, "ERROR");

  return (
    <>
      <Image
        {...{
          src: "/website-maintenance.gif",
          width: 500,
          height: 500,
          alt: "500-Error",
          priority: true,
        }}
      />
      <div className="w-full flex flex-col gap-4">
        <p className="text-4xl text-white underline">
          Aconteceu algo não planejado!
        </p>
        <div className="w-full flex flex-row gap-4 justify-center">
          <Link
            className="bg-red-500 py-2 px-3 rounded hover:opacity-80 duration-300"
            href="/"
          >
            Voltar
          </Link>
          <button
            className="flex text-white border border-b-violet-600 border-t-violet-600 border-l-0 border-r-0 rounded-md py-2 px-8 hover:bg-violet-700 duration-300"
            onClick={reset}
          >
            Tente de Novo
          </button>
        </div>
      </div>
    </>
  );
}
