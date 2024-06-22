"use client";

import { FC, memo, useEffect } from "react";
import { ModeToggle } from "@/components/buttons/mode-toggle";
import { LogoIcon } from "@/components/icons/logo-icon";
import { useSession } from "next-auth/react";
import { SearchInput } from "@/components/form/search-input";
import { PopoverUser } from "@/components/popover-user";
import { GoogleLoginButton } from "@/components/buttons/google-login-button";
import { toast } from "@/components/ui/use-toast";

export const Header: FC = memo(() => {
  const { data: session, status } = useSession() as any;

  useEffect(() => {
    if (status === "authenticated") {
      toast({
        className: "bg-sky-500 text-white",
        title: `Bem Vindo, ${session?.user.name}!`,
        description: "Consuma nossos conteudos a vontade.",
        type: "foreground",
      });
    }
  }, [status]);

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
});

Header.displayName = "Header";
