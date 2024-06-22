import { FC } from "react";
import { UserPlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  on_click: VoidFunction;
}

export const FollowButton: FC<FollowButtonProps> = ({ on_click }) => {
  return (
    <Button
      className="flex flex-row gap-1 bg-indigo-800 hover:bg-indigo-900 dark:bg-indigo-800 dark:hover:bg-indigo-900 transition-all duration-200 dark:text-white"
      onClick={on_click}
    >
      <UserPlus2 /> Seguir
    </Button>
  );
};
