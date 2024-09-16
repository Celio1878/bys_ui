import { FC, useCallback } from "react";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/hooks/fetcher";
import useSWRMutation from "swr/mutation";
import { useFormContext } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);
const BUCKET_URL = String(process.env.NEXT_PUBLIC_BUCKET_URL);

interface InsertBookCoverFormProps {
  bookId: string;
  onUpdateCover: VoidFunction;
}

export const InsertBookCoverForm: FC<InsertBookCoverFormProps> = ({
  bookId,
  onUpdateCover,
}) => {
  const { data: session } = useSession() as any;

  const { trigger } = useSWRMutation(
    `${SERVICE_URL}/${bookId}/cover`,
    fetcher<string>({ token: session?.access_token }).get,
  );

  const form = useFormContext();
  form.setValue("cover", `${BUCKET_URL}/books/${bookId}/cover.jpeg`);

  const handleFileUpload = useCallback(
    async (file: File) => {
      const validateImage = (img: HTMLImageElement): boolean => {
        // console.log(img.width, img.height, "IMAGE");
        if (img.width >= img.height) {
          toast({
            title: "Imagem inválida.",
            description: (
              <span>
                A imagem deve ter formato <b>RETRATO</b>.
              </span>
            ),
            variant: "destructive",
            type: "foreground",
          });
          return false;
        }
        return true;
      };

      try {
        const isValid = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(validateImage(img));
          img.src = URL.createObjectURL(file);
        });

        if (!isValid) return;

        const s3Url = await trigger();
        const res = await fetch(s3Url!, {
          body: file,
          method: "PUT",
          headers: { "Content-Type": file.type },
        });

        if (!res.ok) throw new Error(res.statusText);

        onUpdateCover();
      } catch (error) {
        console.error("Upload failed:", error);
        form.setError("cover", { message: "Upload failed" });
        toast({
          title: "Erro ao inserir capa.",
          variant: "destructive",
          type: "foreground",
        });
      }
    },
    [trigger, onUpdateCover, form],
  );

  return (
    <Card className="px-8 py-4 mt-2 max-h-96 overflow-y-auto bg-slate-50 space-y-2 text-center">
      <CardDescription>
        <span>
          O tipo da imagem deve ser <b>.jpeg</b> e formato <b>retrato</b>.
        </span>
      </CardDescription>
      <Input
        className="w-full cursor-pointer bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-300 dark:hover:bg-indigo-400 text-white"
        required
        type="file"
        accept="image/jpeg"
        id="picture"
        name="picture"
        title="Selecione uma imagem"
        onChange={(e) =>
          e.target.files?.[0] && handleFileUpload(e.target.files[0])
        }
        disabled={form.formState.disabled}
        placeholder="Selecione uma imagem"
      />
    </Card>
  );
};
