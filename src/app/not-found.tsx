import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-black font-sans antialiased">
      <Image
        {...{
          src: "/website-maintenance.gif",
          width: 500,
          height: 500,
          alt: "404-Error",
          priority: true,
        }}
      />

      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-4xl text-white underline"> Página Não Encontrada </p>
        <p className="text-zinc-500">A página que vocé procura não existe.</p>
        <Link
          className="w-10/12 sm:w-1/3 bg-indigo-800 py-2 rounded hover:opacity-80 duration-300 mt-4 text-center text-slate-300"
          href="/"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  );
}
