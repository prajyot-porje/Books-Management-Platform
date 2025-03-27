import mongoose, { Schema, Document } from "mongoose";

export interface IBorrowedBook extends Document {
  userId: mongoose.Types.ObjectId; // Reference to User
  bookId: mongoose.Types.ObjectId; // Reference to Book
  borrowedDate: Date;
  dueDate: Date;
  returnDate?: Date;
  fine: number;
  status: string; // e.g., "Borrowed", "Returned"
}

const BorrowedBookSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowedDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  fine: { type: Number, default: 0 },
  status: { type: String, default: "Borrowed" },
});

export default mongoose.models.BorrowedBook ||
  mongoose.model<IBorrowedBook>("BorrowedBook", BorrowedBookSchema);