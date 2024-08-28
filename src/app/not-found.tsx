import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Image
        {...{
          src: "/website-maintenance.gif",
          width: 500,
          height: 500,
          alt: "404-Error",
          priority: true,
          className: "relative bottom-20",
          unoptimized: true,
        }}
      />

      <div className="relative bottom-10 w-full flex flex-col items-center gap-4 text-center bg-slate-200 dark:bg-slate-900 rounded-md py-10">
        <p className="text-3xl sm:text-4xl text-red-500 underline">
          Página Não Encontrada
        </p>
        <p className="text-zinc-500">A página que vocé procura não existe.</p>
        <Button className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-800 dark:hover:bg-sky-900 dark:text-white transition-all duration-300">
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    </>
  );
}
