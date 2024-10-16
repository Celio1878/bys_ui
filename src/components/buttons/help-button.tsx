import { forwardRef } from "react";

interface HelpButtonProps {
  onClick?: VoidFunction;
}

export const HelpButton = forwardRef<HTMLButtonElement, HelpButtonProps>(
  ({ onClick }, ref) => {
    return (
      <button
        className="text-gray-600 dark:text-gray-400 text-xs hover:underline"
        id={"help"}
        onClick={onClick}
        ref={ref}
      >
        Ajuda
      </button>
    );
  },
);

HelpButton.displayName = "HelpButton";
