import BorrowedBook from "@/lib/database/models/borrowedBook.model"; // Replace with the correct path to your BorrowedBook model
import Book from "@/lib/database/models/books.model"; // Replace with the correct path to your Book model
import { connectToDatabase } from "@/lib/database/index"; // Ensure this is the correct path to your database connection utility

/**
 * Get all borrowed books
 * @returns {Promise<Array>} List of all borrowed books
 */
export const getAllBorrowedBooks = async () => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all borrowed books and populate related book and user details
    const borrowedBooks = await BorrowedBook.find({})
      .populate("book") // Populate book details
      .populate("user"); // Populate user details

    return borrowedBooks;
  } catch (error) {
    console.error("Error fetching all borrowed books:", error);
    throw new Error("Failed to fetch borrowed books");
  }
};

/**
 * Get all books borrowed by a specific user
 * @param {string} userId - The ID of the user
 * @returns {Promise<Array>} List of books borrowed by the user
 */
export const getBorrowedBooksByUser = async (userId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch borrowed books for the specific user and populate book details
    const borrowedBooks = await BorrowedBook.find({ user: userId })
      .populate("book") // Populate book details
      .populate("user"); // Populate user details

    return borrowedBooks;
  } catch (error) {
    console.error(`Error fetching borrowed books for user ${userId}:`, error);
    throw new Error("Failed to fetch borrowed books for the user");
  }
};

/**
 * Borrow a book
 * @param {string} userId - The ID of the user borrowing the book
 * @param {string} bookId - The ID of the book to be borrowed
 * @returns {Promise<Object>} The borrowed book record
 */
export const borrowBook = async (userId: string, bookId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Check if the book exists and has sufficient quantity
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    if (book.quantity <= 0) {
      book.status = "Borrowed"; // Update status to "Borrowed" if no copies are available
      await book.save();
      throw new Error("Book is out of stock");
    }

    // Decrease the book quantity
    book.quantity -= 1;
    if (book.quantity === 0) {
      book.status = "Borrowed"; // Update status to "Borrowed" if no copies are left
    }
    await book.save();

    // Create a new borrowed book record
    const borrowedBook = new BorrowedBook({
      user: userId,
      book: bookId,
      borrowedDate: new Date(),
      isReturned: false,
    });

    await borrowedBook.save();
    return borrowedBook;
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw new Error("Failed to borrow the book");
  }
};

/**
 * Return a borrowed book
 * @param {string} borrowedBookId - The ID of the borrowed book record
 * @returns {Promise<Object>} The updated borrowed book record
 */
export const returnBorrowedBook = async (borrowedBookId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Find the borrowed book record
    const borrowedBook = await BorrowedBook.findById(borrowedBookId);
    if (!borrowedBook) {
      throw new Error("Borrowed book record not found");
    }

    // Check if the book exists
    const book = await Book.findById(borrowedBook.book);
    if (!book) {
      throw new Error("Book not found");
    }

    // Increase the book quantity
    book.quantity += 1;
    if (book.quantity > 0) {
      book.status = "Available"; // Update status to "Available" if copies are now available
    }
    await book.save();

    // Mark the borrowed book as returned
    borrowedBook.isReturned = true;
    borrowedBook.returnedDate = new Date();
    await borrowedBook.save();

    return borrowedBook;
  } catch (error) {
    console.error("Error returning borrowed book:", error);
    throw new Error("Failed to return the borrowed book");
  }
};

/**
 * Get overdue borrowed books
 * @param {Date} dueDate - The due date to check for overdue books
 * @returns {Promise<Array>} List of overdue borrowed books
 */
export const getOverdueBorrowedBooks = async (dueDate: Date) => {
  try {
    // Connect to the database
    await connectToDatabase();

    const overdueBooks = await BorrowedBook.find({
      isReturned: false,
      borrowedDate: { $lt: dueDate },
    }).populate("book").populate("user");

    return overdueBooks;
  } catch (error) {
    console.error("Error fetching overdue borrowed books:", error);
    throw new Error("Failed to fetch overdue borrowed books");
  }
};