import { FC } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export const BookItemsConfirmForm: FC = () => {
  return (
    <Card className="px-8 py-4 mt-2 max-h-96 bg-slate-50 overflow-y-scroll">
      <Image src="/cover.jpg" alt="cover" width={150} height={150} />
    </Card>
  );
};
