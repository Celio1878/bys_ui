import { Loading } from "@/components/loading";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { BookContent } from "@/components/book/book-content";
import { BookChapters } from "@/components/book/book-chapters";

export default function MyBookPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Card className="flex flex-col w-full items-center justify-center py-8">
        <BookContent />
        <Separator className="w-11/12 my-10" />
        <BookChapters />
      </Card>
    </Suspense>
  );
}
