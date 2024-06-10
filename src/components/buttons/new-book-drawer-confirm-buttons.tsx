import { FC } from "react";
import { GoBackButton } from "@/components/buttons/go-back-button";
import { Button } from "@/components/ui/button";

interface NewBookDrawerConfirmButtonsProps {
  go_back_click: VoidFunction;
  disabled: boolean;
  on_confirm_click: VoidFunction;
}

export const NewBookDrawerConfirmButtons: FC<NewBookDrawerConfirmButtonsProps> = ({
  disabled,
  go_back_click,
  on_confirm_click,
}) => {
  return (
    <div className="flex justify-between items-end self-end gap-2">
      <GoBackButton on_click={go_back_click} />
      <Button
        disabled={disabled}
        className="flex bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:text-slate-100"
        onClick={on_confirm_click}
      >
        Confirmar
      </Button>
    </div>
  );
};
