"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BookModal from "@/components/Custom/BookModal";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeholders } from "@/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpenCheck, Loader2 } from 'lucide-react';

const BooksPage = () => {
  const [status, setStatus] = useState("all books");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/books/getBooks?status=${status}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [status]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
        <h1 className="text-3xl font-bold">LibraryHub</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="default">
            <Link href="/admin/addBooks">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Books
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/requests">
              <BookOpenCheck className="mr-2 h-4 w-4" />
              Requests
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>

      <div className="mb-8">
        <Tabs 
          defaultValue="all books" 
          value={status} 
          onValueChange={handleStatusChange}
          className="w-full"
        >
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="all books">All Books</TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading books...</span>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-lg">
          <BookOpenCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">No books found</h3>
          <p className="text-muted-foreground mt-2">
            {status === "all books" 
              ? "There are no books in the library yet." 
              : "There are no borrowed books at the moment."}
          </p>
          {status === "all books" && (
            <Button asChild className="mt-4">
              <Link href="/admin/addBooks">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Books
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-28">
          {list.map((book, index) => (
            <BookModal key={index} isAdmin={true} section={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
