import { FC, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchInput: FC = () => {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const text = encodeURIComponent(event.currentTarget.value);
        router.push(`/search?text=${text}&page=1`);
      }
    },
    [router],
  );

  return (
    <div className="flex flex-row w-8/12 items-center">
      <Search className="relative w-4 h-4 left-7 text-slate-400" />
      <Input
        className="pl-10"
        name="search"
        type="search"
        placeholder="Pesquisar"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
