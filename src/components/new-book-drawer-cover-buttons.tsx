import { FC } from "react";
import { GoBackButton } from "@/components/go-back-button";
import { NextStepButton } from "@/components/next-step-button";

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
    <div className={"w-[12rem] flex justify-between items-end self-end"}>
      <GoBackButton on_click={go_back_click} />
      <NextStepButton disabled={disabled} on_click={next_step_click} />
    </div>
  );
};
