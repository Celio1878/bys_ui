import { FC } from "react";
import { UserPlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  onClick: VoidFunction;
}

export const FollowButton: FC<FollowButtonProps> = ({ onClick }) => {
  return (
    <Button
      className="flex flex-row gap-1 bg-indigo-800 hover:bg-indigo-900 dark:bg-indigo-800 dark:hover:bg-indigo-900 transition-all duration-200 dark:text-white"
      onClick={onClick}
    >
      <UserPlus2 /> Seguir
    </Button>
  );
};
