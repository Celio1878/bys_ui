import { FC, ReactNode } from "react";

interface ToggleButtonProps {
  icon: ReactNode;
  title: string;
  aria_label: string;
  on_click: VoidFunction;
  data_active: boolean;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  data_active,
  aria_label,
  title,
  icon,
  on_click,
}) => {
  return (
    <button
      className="py-2 px-4 rounded-md data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
      title={title}
      aria-label={aria_label}
      onClick={on_click}
      data-active={data_active}
    >
      {icon}
    </button>
  );
};
