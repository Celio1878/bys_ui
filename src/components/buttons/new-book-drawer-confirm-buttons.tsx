import { FC } from "react";
import { GoBackButton } from "@/components/buttons/go-back-button";
import { Button } from "@/components/ui/button";

interface NewBookDrawerConfirmButtonsProps {
  goBackClick: VoidFunction;
  disabled: boolean;
  onConfirmClick: VoidFunction;
}

export const NewBookDrawerConfirmButtons: FC<
  NewBookDrawerConfirmButtonsProps
> = ({ disabled, goBackClick, onConfirmClick }) => {
  return (
    <div className="flex justify-between items-end self-end gap-2">
      <GoBackButton onClick={goBackClick} />
      <Button
        disabled={disabled}
        className="flex bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-600 dark:text-slate-100"
        onClick={onConfirmClick}
      >
        Confirmar
      </Button>
    </div>
  );
};
