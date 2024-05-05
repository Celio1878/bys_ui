"use client";

import { FC, Suspense } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoIcon } from "@/components/icons/logo-icon";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { GoogleIcon } from "@/components/icons/google-icon";

export const Header: FC = () => {
  const { data: session, status } = useSession() as any;

  return (
    <header className="flex flex-row w-full justify-around items-center gap-4 sm:gap-0">
      <LogoIcon {...{ width: 60, height: 60 }} />
      <div className="flex flex-row w-8/12 items-center">
        <Search className="relative w-4 h-4 left-7 text-slate-400" />
        <Input className="pl-10" type="search" placeholder="Pesquisar" />
      </div>

      {status === "unauthenticated" ? (
        <Button className="gap-1" onClick={() => signIn("google")}>
          Login <GoogleIcon width={20} height={20} />
        </Button>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Popover>
            <PopoverTrigger>
              <Image
                src={session ? session?.picture : "/user.png"}
                className="rounded-full"
                width={45}
                height={45}
                alt={session ? session?.name : "User"}
              />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center justify-center divide-y gap-4">
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold">{session?.name}</p>
                <p className="text-sm">{session?.email}</p>
              </div>

              <div className="w-full flex flex-row items-center justify-around pt-4">
                <Link
                  className="border rounded-md py-2.5 px-4 font-semibold hover:text-white hover:bg-indigo-700 transition-all duration-300"
                  href="/profile"
                  target="_top"
                >
                  Perfil
                </Link>
                <Button variant="destructive" onClick={() => signOut()}>
                  Sair
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </Suspense>
      )}

      <ModeToggle />
    </header>
  );
};
