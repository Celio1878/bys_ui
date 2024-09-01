import { FC, ReactNode } from "react";

interface ToggleButtonProps {
  icon: ReactNode;
  title: string;
  ariaLabel: string;
  onClick: VoidFunction;
  dataActive: boolean;
  active: boolean;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  dataActive,
  ariaLabel,
  title,
  icon,
  onClick,
  active,
}) => {
  return (
    <button
      className={`py-2 px-4 rounded-md ${active ? "bg-slate-200 dark:bg-slate-700" : ""} data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700 hover:bg-slate-10 dark:hover:bg-slate-800 transition-all duration-200`}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      data-active={dataActive}
    >
      {icon}
    </button>
  );
};
