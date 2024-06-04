import { FC } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export const NewChapterButton: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      className="sm:gap-2 items-center justify-center"
      onClick={() => router.push(`${pathname}/chapters/new-chapter`)}
    >
      <PlusIcon />
      <span className="hidden sm:block">Novo Capitulo</span>
    </Button>
  );
};
