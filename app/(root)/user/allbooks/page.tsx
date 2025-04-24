"use client";

import React, { useEffect, useState } from "react";
import BookModal from "@/components/Custom/BookModal";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeholders } from "@/constants";
import { IBook } from "@/lib/database/models/books.model"; // Import IBook interface

const Page = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/books/getBooks?status=all books`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IBook[] = await response.json(); // Ensuring API response matches IBook type
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle search input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission (optional)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery) ||
      book.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <div className="py-8 w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>

      {/* Books Section */}
      <div className="flex px-28">
        <div
          className="grid gap-4 p-4"
          style={{
            maxWidth: "1160px",
            width: "100%",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : searchQuery && filteredBooks.length === 0 ? (
            <p className="text-gray-500">No books found matching your search.</p>
          ) : (
            (searchQuery ? filteredBooks : books).map((book, index) => (
              <BookModal key={index} isAdmin={false} section={book} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
