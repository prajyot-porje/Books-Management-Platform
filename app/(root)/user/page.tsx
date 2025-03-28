"use client";
import BookModal from "@/components/Custom/BookModal";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { books, placeholders } from "@/constants";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth hook
import { IBook } from "@/lib/database/models/books.model";

const page = () => {
  const { userId } = useAuth(); // Get the Clerk user ID

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Explicitly type the list state as an array of Book objects
  const [list, setList] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books/getBooks?status=all books");
        setList(response.data); // Ensure the API returns data matching the Book interface
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <div className="pt-2 flex flex-col items-center">
        <div className="py-8 w-full">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
        <div className="w-full h-[400px] relative">
        <Image
             src="/icons/import2/Ellipse 5.svg"
             width={144}
             height={144}
             className="absolute top-[036.17px] left-[-19px]"
             alt=""
           />
           <Image
             src="/icons/import2/icon.svg"
             width={328}
             height={249}
             className="absolute top-[090px] left-[360px]"
             alt=""
           />
           <Image
             src="/icons/import2/vector.svg"
             width={78}
             height={88}
             className="absolute top-[156px] left-[216px]"
             alt=""
           />
           <Image
             src="/icons/import2/Read.svg"
             width={277}
             height={115}
             className="absolute top-[50px] left-[720px]"
             alt=""
           />
           <Image
             src="/icons/import2/Borrow.svg"
             width={255}
             height={80}
             className="absolute top-[150px] left-[814px]"
             alt=""
           />
           <Image
             src="/icons/import2/Buy.svg"
             width={103}
             height={67}
             className="absolute top-[220px] left-[762px]"
             alt=""
           />
           <Image
             src="/icons/import2/vector 3.svg"
             width={229.0000182066629}
             height={296.00000941558292}
             className="absolute top-[10px] left-[1287px]"
             alt=""
           />
           <Image
             src="/icons/import2/Polygon 16.svg"
             width={36.68558451201072}
             height={41.848971569732285}
             className="absolute top-[044.15px] left-[252px]"
             alt=""
           />
           <Image
             src="/icons/import2/Polygon 16.svg"
             width={36.68558451201072}
             height={41.848971569732285}
             className="absolute top-[044.15px] rotate-[15deg] left-[1147px]"
             alt=""
           />
           <Image
             src="/icons/import2/Polygon 6.svg"
             width={133.34103213744518}
             height={133.34103213744518}
             className="absolute top-[138px] left-[1397.51px]"
             alt=""
           />
           <Image
             src="/icons/import2/Polygon 11.svg"
             width={43.91160905751085}
             height={60.21445765358517}
             className="absolute top-[266px] left-[82.58px]"
             alt=""
           />
        </div>
        <div className="h-full w-full flex flex-col">
          <div className="text-2xl text-[#515151] pl-32">New Arrivals</div>
          <div className="w-full flex h-[300px] px-28">
            {list
              .sort(
                (a, b) =>
                  new Date(b.publishedDate).getTime() -
                  new Date(a.publishedDate).getTime()
              ) // Sort by publishedDate descending
              .slice(0, 3) // Get the last three books
              .map((item, index) => {
                return (
                  <BookModal
                    key={index}
                    isAdmin={false}
                    section={item}
                  />
                );
              })}
          </div>
          <div className="text-2xl text-[#515151] pl-32">All Books</div>
          <div className="w-full flex h-[300px] px-28">
            {list
              .sort(() => Math.random() - 0.5) // Shuffle the list randomly
              .slice(0, 3) // Get three random books
              .map((item, index) => {
                return (
                  <BookModal
                    key={index}
                    isAdmin={false}
                    section={item}
                  />
                );
              })}
          </div>

          <div className="text-2xl text-[#515151] pl-32">Trending</div>
          <div className="w-full flex h-[300px] px-28">
            {list
              .sort(() => Math.random() - 0.5) // Shuffle the list randomly
              .slice(0, 3) // Get three random books
              .map((item, index) => {
                return (
                  <BookModal
                    key={index}
                    isAdmin={false}
                    section={item}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
