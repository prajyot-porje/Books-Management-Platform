import BorrowedBook, { IBorrowedBook } from "../database/models/borrowedBook.model";

// Find all borrowed books by user
export const findBorrowedBooksByUser = async (userId: string): Promise<IBorrowedBook[]> => {
  return await BorrowedBook.find({ userId }).populate("bookId");
};

// Find borrowed book by ID
export const findBorrowedBookById = async (id: string): Promise<IBorrowedBook | null> => {
  return await BorrowedBook.findById(id).populate("bookId");
};

// Borrow a book
export const borrowBook = async (borrowData: Partial<IBorrowedBook>): Promise<IBorrowedBook> => {
  const borrowedBook = new BorrowedBook(borrowData);
  return await borrowedBook.save();
};

// Return a book
export const returnBook = async (id: string, returnDate: Date): Promise<IBorrowedBook | null> => {
  return await BorrowedBook.findByIdAndUpdate(
    id,
    { returnDate, status: "Returned" },
    { new: true }
  );
};