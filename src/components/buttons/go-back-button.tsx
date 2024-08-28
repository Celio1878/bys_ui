import { FC } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoBackButtonProps {
  onClick: VoidFunction;
}

export const GoBackButton: FC<GoBackButtonProps> = ({ onClick }) => {
  return (
    <Button className="gap-0.5" onClick={onClick} variant={"outline"}>
      <ArrowLeft />
      <span>Voltar</span>
    </Button>
  );
};
