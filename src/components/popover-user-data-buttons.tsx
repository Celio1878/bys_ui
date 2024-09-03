import { FC } from "react";
import { ProfileLink } from "@/components/profile-link";
import { LogoutButton } from "@/components/buttons/logout-button";
import { signOut } from "next-auth/react";

interface PopoverUserDataButtonsProps {
  userName: string;
}

export const PopoverUserDataButtons: FC<PopoverUserDataButtonsProps> = ({
  userName,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-around pt-4">
      <ProfileLink name={userName} />
      <LogoutButton onClick={signOut} />
    </div>
  );
};
