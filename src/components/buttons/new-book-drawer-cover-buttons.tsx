import { FC } from "react";
import { GoBackButton } from "@/components/buttons/go-back-button";
import { NextStepButton } from "@/components/buttons/next-step-button";

interface NewBookDrawerCoverButtonsProps {
  disabled: boolean;
  next_step_click: VoidFunction;
  go_back_click: VoidFunction;
}

export const NewBookDrawerCoverButtons: FC<NewBookDrawerCoverButtonsProps> = ({
  next_step_click,
  go_back_click,
  disabled,
}) => {
  return (
    <div className="flex justify-between items-end self-end gap-2">
      <GoBackButton on_click={go_back_click} />
      <NextStepButton disabled={disabled} on_click={next_step_click} />
    </div>
  );
};
