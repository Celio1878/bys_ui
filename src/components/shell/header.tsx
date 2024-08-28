"use client";

import { FC, memo, useEffect } from "react";
import { ModeToggle } from "@/components/buttons/mode-toggle";
import { LogoIcon } from "@/components/icons/logo-icon";
import { signIn, useSession } from "next-auth/react";
import { SearchInput } from "@/components/form/search-input";
import { PopoverUser } from "@/components/popover-user";
import { GoogleLoginButton } from "@/components/buttons/google-login-button";
import { toast } from "@/components/ui/use-toast";

// type UserSession = {
//   access_token: string;
//   expires: string;
//   expires_at: number;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image: string;
//   };
// };

export const Header: FC = memo(() => {
  const { data: session, status, update } = useSession() as any;
  const dateNow = Date.now();

  useEffect(() => {
    if (status === "authenticated") {
      toast({
        className: "bg-sky-500 text-white",
        title: `Bem Vindo, ${session?.user.name}!`,
        type: "foreground",
        duration: 3000,
      });
    }
  }, [status]);

  useEffect(() => {
    const oneHour = 1000 * 60 * 60;
    const interval = setInterval(() => update(), oneHour);
    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("google").then(() => null);
    }
  }, [session?.error]);

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
