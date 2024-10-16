import { Flag } from "lucide-react";
import { FC } from "react";

interface ReportButtonProps {
  id: string;
  onClick?: VoidFunction;
}

export const ReportButton: FC<ReportButtonProps> = ({ id, onClick }) => (
  <button
    className="self-center p-2 rounded-full bg-red-100 bg-opacity-50 dark:bg-transparent text-orange-500 hover:text-red-500 hover:bg-red-50 hover:scale-125 transition-all duration-300"
    name={`report-comment-${id}`}
    title={`Reportar`}
    onClick={onClick}
  >
    <Flag size={15} />
  </button>
);
