import { FC } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoBackButtonProps {
  on_click: VoidFunction;
}

export const GoBackButton: FC<GoBackButtonProps> = ({ on_click }) => {
  return (
    <Button className="gap-0.5" onClick={on_click} variant={"outline"}>
      <ArrowLeft />
      <span>Voltar</span>
    </Button>
  );
};
