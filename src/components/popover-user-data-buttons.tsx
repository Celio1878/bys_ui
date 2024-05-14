import { FC } from "react";
import { MyBooksLink } from "@/components/my-books-link";
import { LogoutButton } from "@/components/logout-button";
import { signOut } from "next-auth/react";

interface PopoverUserDataButtonsProps {
  on_close_popover: VoidFunction;
}

export const PopoverUserDataButtons: FC<PopoverUserDataButtonsProps> = ({
  on_close_popover,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-around pt-4">
      <MyBooksLink action={on_close_popover} />
      <LogoutButton on_click={() => signOut()} />
    </div>
  );
};
