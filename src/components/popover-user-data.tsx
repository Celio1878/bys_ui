import { FC } from "react";

interface PopoverUserDataProps {
  session?: { picture: string; name: string; email: string };
}

export const PopoverUserData: FC<PopoverUserDataProps> = ({ session }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-semibold">{session?.name}</p>
      <p className="text-sm">{session?.email}</p>
    </div>
  );
};
