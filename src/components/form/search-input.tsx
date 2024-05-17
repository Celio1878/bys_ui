import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchInput: FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row w-8/12 items-center">
      <Search className="relative w-4 h-4 left-7 text-slate-400" />
      <Input
        className="pl-10"
        name="search"
        type="search"
        placeholder="Pesquisar"
        onKeyDown={(event) =>
          event.key === "Enter" &&
          (event.preventDefault(),
          router.push(`/search?text=${event.currentTarget.value}&page=1`))
        }
      />
    </div>
  );
};
