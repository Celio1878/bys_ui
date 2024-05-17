import { FC } from "react";
import { NewBookDrawerConfirmButtons } from "@/components/buttons/new-book-drawer-confirm-buttons";
import { NewBookDrawerFormButtons } from "@/components/buttons/new-book-drawer-form-buttons";
import { NewBookDrawerCoverButtons } from "@/components/buttons/new-book-drawer-cover-buttons";

interface BookDrawerButtonsProps {
  tab_name: string;
  set_tab_name: (tab_name: string) => void;
  on_cancel: VoidFunction;
}

export const NewBookDrawerButtons: FC<BookDrawerButtonsProps> = ({
  tab_name,
  set_tab_name,
  on_cancel,
}) => {
  switch (tab_name) {
    case "content":
      return (
        <NewBookDrawerFormButtons
          on_cancel={on_cancel}
          next_step_click={() => set_tab_name("cover")}
        />
      );
    case "cover":
      return (
        <NewBookDrawerCoverButtons
          disabled={false}
          go_back_click={() => set_tab_name("content")}
          next_step_click={() => set_tab_name("confirm")}
        />
      );

    case "confirm":
      return (
        <NewBookDrawerConfirmButtons
          disabled={false}
          go_back_click={() => set_tab_name("cover")}
        />
      );
  }
};
