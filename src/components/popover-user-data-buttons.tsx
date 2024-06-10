import { FC } from "react";
import { ProfileLink } from "@/components/profile-link";
import { LogoutButton } from "@/components/buttons/logout-button";
import { signOut } from "next-auth/react";

interface PopoverUserDataButtonsProps {
  user_name: string;
}

export const PopoverUserDataButtons: FC<PopoverUserDataButtonsProps> = ({
  user_name,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-around pt-4">
      <ProfileLink name={user_name} />
      <LogoutButton on_click={signOut} />
    </div>
  );
};
