import { FC } from "react";
import { NewBookDrawerConfirmButtons } from "@/components/buttons/new-book-drawer-confirm-buttons";
import { NewBookDrawerFormButtons } from "@/components/buttons/new-book-drawer-form-buttons";
import { NewBookDrawerCoverButtons } from "@/components/buttons/new-book-drawer-cover-buttons";

interface BookDrawerButtonsProps {
  tab_name: string;
  set_tab_name: (tab_name: string) => void;
  on_cancel: VoidFunction;
  book_values: any;
}

export const NewBookDrawerButtons: FC<BookDrawerButtonsProps> = ({
  tab_name,
  set_tab_name,
  on_cancel,
  book_values,
}) => {
  const disable =
    !book_values.title ||
    !book_values.description ||
    !book_values.genre ||
    !book_values.copyright ||
    !book_values.age_range ||
    book_values.warnings.length === 0;

  switch (tab_name) {
    case "content":
      return (
        <NewBookDrawerFormButtons
          on_cancel={on_cancel}
          next_step_click={() => {
            console.log(book_values, "BOOK VALUES");
            set_tab_name("cover");
          }}
          disabled={disable}
        />
      );
    case "cover":
      return (
        <NewBookDrawerCoverButtons
          disabled={disable}
          go_back_click={() => set_tab_name("content")}
          next_step_click={() => set_tab_name("confirm")}
        />
      );

    case "confirm":
      return (
        <NewBookDrawerConfirmButtons
          disabled={disable}
          go_back_click={() => set_tab_name("cover")}
          on_confirm_click={() => console.log(book_values, "BOOK VALUES")}
        />
      );
  }
};
