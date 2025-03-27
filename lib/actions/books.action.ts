import { IBook } from "../database/models/books.model";
import Book from "../database/models/books.model";
// Find all books
export const findAllBooks = async (): Promise<IBook[]> => {
  return await Book.find();
};

// Find book by ID
export const findBookById = async (id: string): Promise<IBook | null> => {
  return await Book.findById(id);
};

// Find books by category
export const findBooksByCategory = async (category: string): Promise<IBook[]> => {
  return await Book.find({ category });
};

// Update book quantity
export const updateBookQuantity = async (id: string, quantity: number): Promise<IBook | null> => {
  return await Book.findByIdAndUpdate(id, { quantity }, { new: true });
};