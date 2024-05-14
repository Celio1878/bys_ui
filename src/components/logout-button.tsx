import { FC } from "react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  on_click: VoidFunction;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ on_click }) => {
  return (
    <Button variant="destructive" onClick={on_click}>
      Sair
    </Button>
  );
};
