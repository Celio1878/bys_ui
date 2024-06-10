import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewBookForm } from "@/components/form/new-book-form";
import { InsertBookCoverForm } from "@/components/form/insert-book-cover-form";
import { BookItemsConfirmForm } from "@/components/form/book-items-confirm-form";

interface NewBookStepsProps {
  tab_name: string;
}

export const NewBookSteps: FC<NewBookStepsProps> = ({ tab_name }) => {
  const [book_data, set_book_data] = useState<any>(null);

  return (
    <Tabs value={tab_name} defaultValue="content">
      <TabsList>
        <TabsTrigger value="content" disabled={tab_name !== "content"}>
          Conteudo
        </TabsTrigger>
        <TabsTrigger value="cover" disabled={tab_name !== "cover"}>
          Capa
        </TabsTrigger>
        <TabsTrigger value="confirm" disabled={tab_name !== "confirm"}>
          Confirmar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <NewBookForm set_book_data={set_book_data} />
      </TabsContent>
      <TabsContent value="cover">
        <InsertBookCoverForm />
      </TabsContent>
      <TabsContent value="confirm">
        <BookItemsConfirmForm book_data={book_data} />
      </TabsContent>
    </Tabs>
  );
};
