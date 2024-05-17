import { FC } from "react";
import { GoBackButton } from "@/components/buttons/go-back-button";
import { Button } from "@/components/ui/button";

interface NewBookDrawerConfirmButtonsProps {
  go_back_click: VoidFunction;
  disabled: boolean;
}

export const NewBookDrawerConfirmButtons: FC<
  NewBookDrawerConfirmButtonsProps
> = ({ disabled, go_back_click }) => {
  return (
    <div className={"w-[13rem] flex justify-between items-end self-end"}>
      <GoBackButton on_click={go_back_click} />
      <Button disabled={disabled}>Confirmar</Button>
    </div>
  );
};
