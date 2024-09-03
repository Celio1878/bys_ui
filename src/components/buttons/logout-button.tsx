import { FC } from "react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  onClick: VoidFunction;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <Button variant="destructive" onClick={onClick}>
      Sair
    </Button>
  );
};
