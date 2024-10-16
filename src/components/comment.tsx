import { FC, useState } from "react";
import { CommentData } from "@/app/model/chapter-dto";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "@/hooks/fetcher";
import { ProfileDto } from "@/app/model/profile-dto";
import Image from "next/image";
import { DeleteButton } from "@/components/buttons/delete-button";
import { ReportDrawer } from "@/components/report-drawer";
import { ReportButton } from "@/components/buttons/report-button";

interface CommentProps {
  comment: CommentData;
  onRemove: (commentId: string) => void;
}

const PROFILE_SERVICE_URL = String(process.env.NEXT_PUBLIC_PROFILES_API_URL);

export const Comment: FC<CommentProps> = ({ onRemove, comment }) => {
  const { data: session } = useSession() as any;
  const userId = session?.user.id;
  const date = format(comment.createdAt, "dd/MM/yyyy");

  const [openReport, setOpenReport] = useState(false);

  const { data: authorProfile } = useSWR(
    `${PROFILE_SERVICE_URL}/${comment.author.id}`,
    fetcher<ProfileDto>({}).get,
  );

  return (
    <div className="flex flex-col w-full self-center gap-2 pl-4 md:pl-10">
      <div className="flex flex-row w-full justify-between gap-4">
        <span className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            {...{
              src: authorProfile?.urlImage!,
              alt: authorProfile?.name!,
              width: 40,
              height: 40,
              priority: true,
              quality: 100,
            }}
          />
          <p className="max-w-[10rem] text-xs opacity-60 text-center">
            {comment.author.title}
          </p>
        </span>
        <p className="self-center text-xs opacity-50">{date}</p>
      </div>
      <div className="flex flex-row justify-between gap-4">
        <p className="w-full bg-slate-100 rounded-md py-2 px-4 text-sm dark:bg-neutral-950 dark:border dark:border-neutral-900 opacity-70 dark:opacity-90">
          {comment.content}
        </p>

        {comment.author.id === userId ? (
          <DeleteButton onClick={() => onRemove(comment.id)} />
        ) : (
          <ReportDrawer
            isOpen={openReport}
            setIsOpen={setOpenReport}
            onConfirm={() => {}}
            trigger={<ReportButton id={"report"} />}
          />
        )}
      </div>
    </div>
  );
};
