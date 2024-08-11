import { FC } from "react";
import { Button } from "@/components/ui/button";

interface NextStepButtonProps {
  onClick: VoidFunction;
  disabled?: boolean;
}

export const NextStepButton: FC<NextStepButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      Avancar
    </Button>
  );
};
