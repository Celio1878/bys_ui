import { FC } from "react";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/hooks/fetcher";
import { Loading } from "@/components/loading";
import useSWRMutation from "swr/mutation";
import { useFormContext } from "react-hook-form";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const BUCKET_URL = String(process.env.NEXT_PUBLIC_BUCKET_URL);

interface InsertBookCoverFormProps {
  session: any;
  bookId: string;
}

export const InsertBookCoverForm: FC<InsertBookCoverFormProps> = ({
  bookId,
  session,
}) => {
  const { trigger, isMutating } = useSWRMutation(
    `${SERVICE_URL}/${bookId}/cover`,
    fetcher<string>({ token: session?.access_token }).get,
  );

  const form = useFormContext();
  form.setValue("cover", `${BUCKET_URL}/books/${bookId}/cover.jpeg`);

  if (isMutating) return <Loading />;

  const handleFileUpload = async (file: File) => {
    const s3Url = await trigger();

    const res = await fetch(s3Url!, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!res.ok) {
      console.error("Upload failed" + res.statusText);
      return;
    }
  };

  return (
    <Card className="px-8 py-4 mt-2 max-h-96 overflow-y-scroll bg-slate-50 space-y-2 text-center">
      <CardDescription>
        <span>Selecione uma imagem.</span>
      </CardDescription>
      <Input
        accept="image/jpeg"
        id="picture"
        name="picture"
        required
        title="Selecione uma imagem"
        type="file"
        onChange={(e) =>
          e.target.files?.[0] && handleFileUpload(e.target.files[0])
        }
        placeholder="Selecione uma imagem"
        className="w-full gap-2 cursor-pointer bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-300 dark:hover:bg-indigo-400 text-white dark:text-white"
      />
    </Card>
  );
};
