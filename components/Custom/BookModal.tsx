import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth hook
import Image from "next/image";
import { Modal, ModalBody, ModalTrigger } from "../ui/animated-modal";
import { IBook } from "@/lib/database/models/books.model";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AlertCircle, BookOpen, Calendar, DollarSign, Grid, IndianRupee, Tag, Users } from "lucide-react";
import { Separator } from "../ui/separator";

const BookModal = ({ section, isAdmin }: { section: IBook; isAdmin: boolean }) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("error")
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

  // Format the date to "month/year"
  const formatDate = (date: string | Date) => {
    const parsedDate = new Date(date); // Convert string to Date object
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date"; // Handle invalid date inputs
    }
    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(parsedDate);
  };

  return (
    <div>
      <Modal>
        <ModalTrigger>
          <div
            className="flex space-x-5 p-5 w-[400px] h-[200px] border border-gray-300 rounded-md"
            style={{ overflow: "hidden" }}
          >
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
                className="object-cover"
                onError={() => setImageError(true)}
              />
            )}
            <div className="flex flex-col items-start space-y-2 justify-center text-left w-full">
              <div className="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                {section.title}
              </div>
              <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                by {section.author}
              </div>
              <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                Published on {formatDate(section.publishedDate)}
              </div>
              <Badge className="bg-green-400" variant={section.status.toLowerCase() === "available" ? "default" : "destructive"}>
                {section.status.toLowerCase() === "available" ? "Available" : "Not Available"}
              </Badge>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody>
          <div className="flex flex-col md:flex-row gap-8 p-6 max-w-3xl mx-auto">
            {/* Image Section */}
            <div className="flex-shrink-0">
              {imageError ? (
                <div className="flex items-center justify-center h-[250px] w-[200px] bg-muted text-muted-foreground rounded-md border border-border">
                  Image not available
                </div>
              ) : (
                <img
                  src={section.img || "/placeholder.svg"}
                  alt={section.title}
                  height={250}
                  width={200}
                  className="object-cover rounded-md border border-border shadow-sm"
                  onError={() => setImageError(true)}
                />
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                <p className="text-lg text-muted-foreground">by {section.author}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Published: {formatDate(section.publishedDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Publisher: {section.publisher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Category: {section.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <span>Price: Rs.{section.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Grid className="h-4 w-4 text-muted-foreground" />
                  <span>Quantity: {section.quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Status: </span>
                  <Badge className="bg-green-400 " variant={section.status.toLowerCase() === "available" ? "default" : "destructive"}>
                    {section.status.toLowerCase() === "available" ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>

              {/* Borrow Button */}
              {!isAdmin && (
                <div className="mt-4 space-y-3">
                  <Button
                    className="w-full sm:w-auto"
                    onClick={handleBorrow}
                    disabled={loading || section.status.toLowerCase() !== "available"}
                  >
                    {loading ? "Processing..." : "Borrow Book"}
                  </Button>

                  {message && (
                    <Alert >
                      <AlertCircle className={`h-4 w-4 ${messageType === "success" ? "text-red-500" : "text-green-500"}`} />
                      <AlertDescription className={messageType === "success" ? "text-red-500" : "text-green-500"}>
                      {message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BookModal;
