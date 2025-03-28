"use client";
import React, { useEffect, useState } from "react";
import BookModal from "@/components/Custom/BookModal";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeholders } from "@/constants";

const Page = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/books/getBooks?status=all books`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div>
      <div className="py-8 w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    <div className="flex px-28">
      <div
        className="grid gap-4 p-4"
        style={{
          maxWidth: "1160px", // Set a max width for the content
          width: "100%", // Ensure it takes up the full width of the container
          gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
        }}
      >
        {books.map((book, index) => (
          <BookModal key={index} isAdmin={false} section={book} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Page;