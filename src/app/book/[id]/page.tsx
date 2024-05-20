import { Loading } from "@/components/loading";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";

export default function BookPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Card className="flex flex-col w-full items-center justify-center gap-8 py-8">
        book title
      </Card>
    </Suspense>
  );
}
