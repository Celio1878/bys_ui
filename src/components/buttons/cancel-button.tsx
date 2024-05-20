import { FC } from "react";
import { Button } from "@/components/ui/button";

interface CancelButtonProps {
  on_click: VoidFunction;
}

export const CancelButton: FC<CancelButtonProps> = ({ on_click }) => {
  return (
    <Button onClick={on_click} variant={"destructive"}>
      Cancelar
    </Button>
  );
};
