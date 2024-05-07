"use client";

import { FC } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoIcon } from "@/components/icons/logo-icon";
import { useSession } from "next-auth/react";
import { SearchInput } from "@/components/search-input";
import { PopoverUser } from "@/components/popover-user";
import { GoogleLoginButton } from "@/components/google-login-button";

export const Header: FC = () => {
  const { data: session, status } = useSession() as any;

  return (
    <header className="flex flex-row w-full justify-around items-center gap-4 sm:gap-0 pt-4 px-2">
      <LogoIcon {...{ width: 60, height: 60 }} />
      <SearchInput />

      {status === "unauthenticated" ? (
        <GoogleLoginButton />
      ) : (
        <PopoverUser {...{ session }} />
      )}

      <ModeToggle />
    </header>
  );
};
