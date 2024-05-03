import { FC } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoIcon } from "@/components/icons/logo-icon";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";

export const Header: FC = () => {
  return (
    <header className="flex flex-row w-full justify-around items-center gap-4 sm:gap-0">
      <LogoIcon {...{ width: 60, height: 60 }} />
      <div className="flex flex-row w-8/12 items-center">
        <Search className="relative w-4 h-4 left-7 text-slate-400" />
        <Input className="pl-10" type="search" placeholder="Pesquisar" />
      </div>

      <Button>
        <User />
      </Button>
      <ModeToggle />
    </header>
  );
};
