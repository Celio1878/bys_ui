"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoIcon } from "@/components/icons/logo-icon";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { NavMenu } from "@/components/nav-menu";
import { Banner } from "@/components/banner";
import { Books } from "@/components/books";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { TwitterIcon } from "@/components/icons/twitter-icon";

export default function Home() {
  return (
    <main>
      <header className="flex flex-row w-full justify-around items-center pt-2 gap-4 sm:gap-0 px-6 sm:px-0">
        <LogoIcon {...{ width: 60, height: 60 }} />
        <div className="flex flex-row w-8/12 items-center">
          <Search className="relative w-4 h-4 left-7 text-slate-400" />
          <Input className="pl-10" type="search" placeholder="Pesquisar" />
        </div>

        <Button onClick={() => console.log("SignIn")}>
          <User />
        </Button>
        <ModeToggle />
      </header>

      <nav className="flex w-full items-center justify-center py-5">
        <NavMenu />
      </nav>

      <section className="flex flex-col items-center justify-center">
        <Banner />
      </section>
      <section className="flex flex-col items-center justify-center gap-32 py-20">
        <Books />
        <Books />
        <Books />
        <Books />
        <Books />
      </section>
      <footer className="flex flex-col items-center justify-center gap-4 py-4">
        <LogoIcon {...{ width: 100, height: 100 }} />
        <div className="flex flex-row items-center gap-6">
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
        </div>
        <p className="text-sm">
          © 2024 - Be Your Stories. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
