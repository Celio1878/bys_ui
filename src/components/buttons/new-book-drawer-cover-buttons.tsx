import { FC } from "react";
import { GoBackButton } from "@/components/buttons/go-back-button";

interface NewBookDrawerCoverButtonsProps {
  goBackClick: VoidFunction;
}

export const NewBookDrawerCoverButtons: FC<NewBookDrawerCoverButtonsProps> = ({
  goBackClick,
}) => {
  return <GoBackButton onClick={goBackClick} />;
};
