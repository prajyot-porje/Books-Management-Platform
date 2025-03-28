"use client";
import BookModal from "@/components/Custom/BookModal";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeholders } from "@/constants";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const page = () => {
  const [status, setStatus] = useState("all books");
  const [list, setList] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const borrowClick = () => {
    setStatus("all books");
  };

  const returnedClick = () => {
    setStatus("borrowed");
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/books/getBooks?status=${status}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [status]);

  return (
    <div>
      <div className="py-8 w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      <div className="flex px-32 p-6 justify-between items-center">
        <div className="space-x-4">
          <button
            onClick={borrowClick}
            className={`px-4 py-2 ${
              status === "all books" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            All Books
          </button>
          <button
            onClick={returnedClick}
            className={`px-4 py-2 ${
              status === "borrowed" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            Borrowed
          </button>
        </div>
        <Link
          href="/admin/addBooks"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Books
        </Link>
        <Link
          href="/admin/requests"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Requests
        </Link>
      </div>
      <div>
        {list.map((book, index) => (
          <BookModal key={index} isAdmin={true} section={book} />
        ))}
      </div>
    </div>
  );
};

export default page;
