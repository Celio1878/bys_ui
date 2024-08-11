import { FC } from "react";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

const SERVICE_URL = String(process.env.NEXT_PUBLIC_SERVICE_URL);

interface InsertBookCoverFormProps {
  bookId: string;
}

export const InsertBookCoverForm: FC<InsertBookCoverFormProps> = ({
  bookId,
}) => {
  const { data: session } = useSession() as any;
  // const { data, error, isLoading } = useSWR(
  //   `${SERVICE_URL}/cover?author=${session?.user?.email}&book=${bookId}`,
  //   fetcher<string>({ token: session?.account?.id_token }).get,
  // );

  // if (isLoading) return <Loading />;

  return (
    <Card className="px-8 py-4 mt-2 max-h-96 overflow-y-scroll bg-slate-50 space-y-2 text-center">
      <CardDescription>
        <span>Selecione uma imagem.</span>
      </CardDescription>
      <Input
        accept="image/*"
        id="picture"
        name="picture"
        required={true}
        title="Selecione uma imagem"
        type="file"
        onChange={(e) => console.log(e)}
        placeholder="Selecione uma imagem"
        className="w-full gap-2 cursor-pointer bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-300 dark:hover:bg-indigo-400 text-white dark:text-white"
      />
    </Card>
  );
};
