import { FC } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onClick: VoidFunction;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="destructive"
      size="icon"
      id="logout-button"
      title="Logout"
      name="logout-button"
      onClick={onClick}
    >
      <LogOut />
    </Button>
  );
};
