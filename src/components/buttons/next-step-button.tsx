import { FC } from "react";
import { Button } from "@/components/ui/button";

interface NextStepButtonProps {
  on_click: VoidFunction;
  disabled?: boolean;
}

export const NextStepButton: FC<NextStepButtonProps> = ({
  on_click,
  disabled,
}) => {
  return (
    <Button disabled={disabled} onClick={on_click}>
      Avancar
    </Button>
  );
};
