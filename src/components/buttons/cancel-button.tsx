import { FC } from "react";
import { Button } from "@/components/ui/button";

interface CancelButtonProps {
  onClick: VoidFunction;
}

export const CancelButton: FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} variant={"destructive"}>
      Cancelar
    </Button>
  );
};
