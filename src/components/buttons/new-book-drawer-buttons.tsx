import { FC } from "react";
import { NewBookDrawerConfirmButtons } from "@/components/buttons/new-book-drawer-confirm-buttons";
import { NewBookDrawerFormButtons } from "@/components/buttons/new-book-drawer-form-buttons";
import { GoBackButton } from "@/components/buttons/go-back-button";

interface BookDrawerButtonsProps {
  tabName: string;
  setTabName: (tab_name: string) => void;
  onClose: VoidFunction;
  bookValues: any;
  onConfirmClick: VoidFunction;
}

export const NewBookDrawerButtons: FC<BookDrawerButtonsProps> = ({
  tabName,
  setTabName,
  onClose,
  bookValues,
  onConfirmClick,
}) => {
  const disable =
    !bookValues.title ||
    !bookValues.description ||
    !bookValues.genre ||
    !bookValues.copyright ||
    !bookValues.ageRange ||
    bookValues.warnings.length === 0;

  switch (tabName) {
    case "content":
      return (
        <NewBookDrawerFormButtons
          onCancel={onClose}
          nextStepClick={() => setTabName("cover")}
          disabled={disable}
        />
      );
    case "cover":
      return <GoBackButton onClick={() => setTabName("content")} />;

    case "confirm":
      return (
        <NewBookDrawerConfirmButtons
          disabled={disable}
          goBackClick={() => setTabName("cover")}
          onConfirmClick={onConfirmClick}
        />
      );
  }
};
