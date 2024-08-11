import { FC } from "react";
import { CancelButton } from "@/components/buttons/cancel-button";
import { NextStepButton } from "@/components/buttons/next-step-button";

interface NewBookDrawerFormButtonsProps {
  onCancel: VoidFunction;
  nextStepClick: VoidFunction;
  disabled: boolean;
}

export const NewBookDrawerFormButtons: FC<NewBookDrawerFormButtonsProps> = ({
  onCancel,
  nextStepClick,
  disabled,
}) => {
  return (
    <div className="flex justify-between items-end self-end gap-2">
      <CancelButton onClick={onCancel} />
      <NextStepButton onClick={nextStepClick} disabled={disabled} />
    </div>
  );
};
