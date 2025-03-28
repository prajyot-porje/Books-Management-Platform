import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth hook
import Image from "next/image";
import { Modal, ModalBody, ModalTrigger } from "../ui/animated-modal";

interface Book {
  id: string;
  title: string;
  auth: string;
  img: string;
  publishedDate: string;
  fine: string;
  status: string;
  isbn?: string; 
}

const BookModal = ({ section, isAdmin }: { section: Book; isAdmin: boolean }) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { userId } = useAuth(); // Get the Clerk user ID

  const handleBorrow = async () => {
    if (!userId) {
      setMessage("You must be logged in to borrow a book.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/books/borrowRequests/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          bookId: section.isbn,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Borrow request submitted successfully!");
      } else {
        setMessage(data.error || "Failed to submit borrow request.");
      }
    } catch (error) {
      console.error("Error submitting borrow request:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal>
        <ModalTrigger>
          <div className="flex space-x-5 p-5 pl-32 ">
            {imageError ? (
              <div className="flex items-center justify-center h-[130px] w-[130px] bg-gray-200 text-gray-500">
                Image not available
              </div>
            ) : (
              <img
                src={section.img}
                alt={section.img}
                height={130}
                width={130}
                onError={() => setImageError(true)}
              />
            )}
            <div className="flex flex-col items-start space-y-2 justify-center">
              <div className="text-xl">{section.title}</div>
              <div className="text-sm text-[#515151]">by {section.auth}</div>
              <div className="text-sm text-[#515151]">
                Published on {section.publishedDate}
              </div>
              <div className="text-sm text-[#515151]">
                Status: {section.status}
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody>
          <div className="flex items-center h-[400px] justify-start px-10">
            <div className="flex flex-col items-center justify-center">
              {imageError ? (
                <div className="flex items-center justify-center h-[200px] w-[200px] bg-gray-200 text-gray-500 border-2 border-gray-400">
                  Image not available
                </div>
              ) : (
                <img
                  src={section.img}
                  alt={section.img}
                  height={200}
                  width={200}
                  className="border-2 border-gray-400"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="flex flex-col items-start justify-center p-5">
              <div className="text-3xl font-bold">{section.title}</div>
              <div className="text-xl">by {section.auth}</div>
              <div className="text-xl text-[#515151]">
                Published on {section.publishedDate}
              </div>
              <div className="text-xl text-[#515151]">
                Status: {section.status}
              </div>
              {!isAdmin && (
                <>
                  <button
                    className="bg-blue-500 text-white px-5 py-2 rounded-md mt-5"
                    onClick={handleBorrow}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Borrow"}
                  </button>
                  {message && (
                    <div className="mt-3 text-sm text-red-500">{message}</div>
                  )}
                </>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BookModal;
