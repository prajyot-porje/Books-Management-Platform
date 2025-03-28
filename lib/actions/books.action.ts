import Book from "@/lib/database/models/books.model"; // Adjust the path to your Book model
import { connectToDatabase } from "@/lib/database"; // Adjust the path to your database connection utility

/**
 * Fetch a book by its ISBN from the database.
 * @param isbn - The ISBN of the book to fetch.
 * @returns The book document if found, or null if not found.
 */
export const getBookByISBN = async (isbn: string) => {
  try {
    console.log("Connecting to Database..."); // Debugging log
    await connectToDatabase();
    console.log("Connected to Database"); // Debugging log

    // Query the database for the book with the given ISBN
    const book = await Book.findOne({ isbn }).exec();

    return book;
  } catch (error) {
    console.error("Error fetching book by ISBN:", error);
    throw new Error("Failed to fetch book by ISBN");
  }
};