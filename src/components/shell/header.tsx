"use client";

import { FC, Suspense } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoIcon } from "@/components/icons/logo-icon";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { SearchInput } from "@/components/search-input";
import { PopoverUser } from "@/components/popover-user";

export const Header: FC = () => {
  const { data: session, status } = useSession() as any;

  return (
    <header className="flex flex-row w-full justify-around items-center gap-4 sm:gap-0">
      <LogoIcon {...{ width: 60, height: 60 }} />
      <SearchInput />

      {status === "unauthenticated" && session.email ? (
        <Button className="gap-1" onClick={() => signIn("google")}>
          Login <GoogleIcon width={20} height={20} />
        </Button>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <PopoverUser {...{ session }} />
        </Suspense>
      )}

      <ModeToggle />
    </header>
  );
};
