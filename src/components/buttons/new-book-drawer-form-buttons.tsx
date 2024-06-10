import { FC } from "react";
import { CancelButton } from "@/components/buttons/cancel-button";
import { NextStepButton } from "@/components/buttons/next-step-button";

interface NewBookDrawerFormButtonsProps {
  on_cancel: VoidFunction;
  next_step_click: VoidFunction;
  disabled: boolean;
}

export const NewBookDrawerFormButtons: FC<NewBookDrawerFormButtonsProps> = ({
  on_cancel,
  next_step_click,
  disabled,
}) => {
  return (
    <div className="flex justify-between items-end self-end gap-2">
      <CancelButton on_click={on_cancel} />
      <NextStepButton on_click={next_step_click} disabled={disabled} />
    </div>
  );
};
