import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchInput: FC = () => {
  return (
    <div className="flex flex-row w-8/12 items-center">
      <Search className="relative w-4 h-4 left-7 text-slate-400" />
      <Input className="pl-10" type="search" placeholder="Pesquisar" />
    </div>
  );
};
