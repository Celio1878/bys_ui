import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewBookForm } from "@/components/form/new-book-form";
import { InsertBookCoverForm } from "@/components/form/insert-book-cover-form";
import { BookItemsConfirmForm } from "@/components/form/book-items-confirm-form";

interface NewBookStepsProps {
  tabName: string;
}

export const NewBookSteps: FC<NewBookStepsProps> = ({ tabName }) => {
  const [bookData, setBookData] = useState<any>(null);
  const bookId =
    bookData?.title.toLowerCase().replace(/\s/g, "-") + "-" + Date.now();

  return (
    <Tabs value={tabName} defaultValue="content">
      <TabsList>
        <TabsTrigger value="content" disabled={tabName !== "content"}>
          Conteudo
        </TabsTrigger>
        <TabsTrigger value="cover" disabled={tabName !== "cover"}>
          Capa
        </TabsTrigger>
        <TabsTrigger value="confirm" disabled={tabName !== "confirm"}>
          Confirmar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <NewBookForm setBookData={setBookData} />
      </TabsContent>
      <TabsContent value="cover">
        <InsertBookCoverForm bookId={bookId} />
      </TabsContent>
      <TabsContent value="confirm">
        <BookItemsConfirmForm bookData={bookData} />
      </TabsContent>
    </Tabs>
  );
};
