import { FC, ReactNode } from "react";

interface FollowTriggerProps {
  label: string;
  quantity: number;
  icon?: ReactNode;
}

export const FollowTrigger: FC<FollowTriggerProps> = ({
  quantity,
  label,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 border rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
      <div className="flex flex-row gap-2">
        {icon}
        <h6 className="opacity-70">{label}</h6>
      </div>
      {quantity}
    </div>
  );
};
