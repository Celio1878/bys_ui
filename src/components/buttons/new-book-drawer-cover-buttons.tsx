import { FC } from "react";
import { GoBackButton } from "@/components/buttons/go-back-button";
import { NextStepButton } from "@/components/buttons/next-step-button";

interface NewBookDrawerCoverButtonsProps {
  disabled: boolean;
  nextStepClick: VoidFunction;
  goBackClick: VoidFunction;
}

export const NewBookDrawerCoverButtons: FC<NewBookDrawerCoverButtonsProps> = ({
  nextStepClick,
  goBackClick,
  disabled,
}) => {
  return (
    <div className="flex justify-between items-end self-end gap-2">
      <GoBackButton onClick={goBackClick} />
      <NextStepButton disabled={disabled} onClick={nextStepClick} />
    </div>
  );
};
