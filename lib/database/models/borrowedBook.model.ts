import mongoose, { Schema, Document } from "mongoose";

export interface IBorrowedBook extends Document {
  userId: string; // User ID as a string
  bookId: string; // Book ID as a string
  borrowedDate: Date;
  returnDate?: Date;
  fine: number;
  status: string; // e.g., "Borrowed", "Returned"
  img: string; // Book image URL
  title: string; // Book title
  author: string; // Book author
}

const BorrowedBookSchema: Schema = new Schema({
  userId: { type: String, required: true }, // Store userId as a string
  bookId: { type: String, required: true }, // Store bookId as a string
  borrowedDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  fine: { type: Number, default: 0 },
  status: { type: String, default: "Borrowed" },
  img: { type: String, required: true }, // Book image URL
  title: { type: String, required: true }, // Book title
  author: { type: String, required: true }, // Book author
});

export default mongoose.models.BorrowedBook ||
  mongoose.model<IBorrowedBook>("BorrowedBook", BorrowedBookSchema);