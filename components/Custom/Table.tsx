import React from "react";
import { borrow } from "@/constants";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  auth: string;
  img: string;
  due: string;
  fine: string;
  status: string;
}

const Table = ({ section }: { section: string }) => {
  const filteredBooks = borrow.filter((item: Book) => item.status === section);

  return (
    <div className="w-full pb-20">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Book</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Author</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Fine</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book,idx) => (
            <tr key={idx} className="text-center">
              <td className="border border-gray-300 px-4 py-2 flex justify-center items-center">
                <Image src={book.img} alt={book.img} height={50} width={50} />
              </td>
              <td className="border border-gray-300 px-4 py-2">{book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{book.auth}</td>
              <td className="border border-gray-300 px-4 py-2">{book.due}</td>
              <td className="border border-gray-300 px-4 py-2">{book.fine}</td>
              <td className="border border-gray-300 px-4 py-2">{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
