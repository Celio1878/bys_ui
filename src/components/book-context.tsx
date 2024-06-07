"use client";

import { createContext } from "react";
import { book_data } from "@/app/model/story";

export const BookContext = createContext({
  book: book_data,
  set_book: (book: typeof book_data) => {},
});

export const BookProvider = () => {
  return (
    <BookContext.Provider
      value={{
        book: book_data,
        set_book: () => {},
      }}
    ></BookContext.Provider>
  );
};
