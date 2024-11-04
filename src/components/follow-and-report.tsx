import { FC, ReactNode } from "react";
import { ReportDrawer } from "@/components/report-drawer";
import { ReportButton } from "@/components/buttons/report-button";

interface FollowAndReportProps {
  followButton: ReactNode;
  openReport: boolean;
  setOpenReport: (value: boolean) => void;
}

export const FollowAndReport: FC<FollowAndReportProps> = ({
  followButton,
  setOpenReport,
  openReport,
}) => {
  return (
    <div className="flex flex-row gap-4">
      {followButton}
      <ReportDrawer
        isOpen={openReport}
        setIsOpen={setOpenReport}
        trigger={<ReportButton id={"report"} />}
      />
    </div>
  );
};
