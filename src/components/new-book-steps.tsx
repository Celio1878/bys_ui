import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewBookForm } from "@/components/new-book-form";
import { InsertBookCoverForm } from "@/components/insert-book-cover-form";
import { BookItemsConfirmForm } from "@/components/book-items-confirm-form";

interface NewBookStepsProps {
  tab_name: string;
}

export const NewBookSteps: FC<NewBookStepsProps> = ({ tab_name }) => {
  return (
    <Tabs className="w-full" value={tab_name}>
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
        <NewBookForm />
      </TabsContent>
      <TabsContent value="cover">
        <InsertBookCoverForm />
      </TabsContent>
      <TabsContent value="confirm">
        <BookItemsConfirmForm />
      </TabsContent>
    </Tabs>
  );
};
