import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewBookForm } from "@/components/form/new-book-form";
import { InsertBookCoverForm } from "@/components/form/insert-book-cover-form";
import { BookItemsConfirmForm } from "@/components/form/book-items-confirm-form";
import { useSession } from "next-auth/react";

interface NewBookStepsProps {
  tabName: string;
  bookDto: any;
  onUpdateCover: VoidFunction;
}

export const NewBookSteps: FC<NewBookStepsProps> = ({
  tabName,
  bookDto,
  onUpdateCover,
}) => {
  const { data: session } = useSession() as any;
  const bookId =
    bookDto.title.toLowerCase().replace(/\s/g, "-") + "-" + session?.user?.id;

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
        <NewBookForm />
      </TabsContent>
      <TabsContent value="cover">
        <InsertBookCoverForm onUpdateCover={onUpdateCover} bookId={bookId} />
      </TabsContent>
      <TabsContent value="confirm">
        <BookItemsConfirmForm session={session} book={bookDto} />
      </TabsContent>
    </Tabs>
  );
};
