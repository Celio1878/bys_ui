import { FC } from "react";
import { FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UpdateBookButton: FC = () => {
  return (
    <Button
      variant="secondary"
      className="flex flex-row justify-center items-center gap-2"
    >
      <FilePenLine />
      <p>Editar</p>
    </Button>
  );
};
