"use client";

import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserImage } from "@/components/user-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface Props {
  session?: { picture: string; name: string; email: string };
}

export const PopoverUser: FC<Props> = ({ session }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <UserImage {...{ width: 45, height: 45 }} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center justify-center divide-y gap-4">
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold">{session?.name}</p>
          <p className="text-sm">{session?.email}</p>
        </div>

        <div className="w-full flex flex-row items-center justify-around pt-4">
          <Link
            className="border rounded-md py-2.5 px-4 font-semibold hover:text-white hover:bg-indigo-700 transition-all duration-300"
            href="/my-books"
          >
            Meus Livros
          </Link>
          <Button variant="destructive" onClick={() => signOut()}>
            Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
