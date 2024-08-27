import { useSession } from "next-auth/react";
import { CreateBookDto, Story } from "@/app/model/story";
import { fetcher } from "@/hooks/fetcher";

const BOOK_SERVICE_URL = String(process.env.NEXT_PUBLIC_BOOKS_API_URL);

export function useBookApi() {
  const { data: session } = useSession() as any;

  return {
    createBook: async (dto: CreateBookDto) =>
      await fetcher<CreateBookDto>({
        body: dto,
        token: session?.access_token,
      }).post(BOOK_SERVICE_URL),

    updateBook: async (id: string, dto: Story) =>
      await fetcher<Story>({ body: dto, token: session?.access_token }).put(
        `${BOOK_SERVICE_URL}/${id}`,
      ),
    deleteBook: async (id: string) =>
      await fetcher({ token: session?.access_token }).delete(
        `${BOOK_SERVICE_URL}/book/${id}`,
      ),
  };
}
