import mongoose, { Schema, Document } from "mongoose";

export interface IBorrowedBook extends Document {
  userId: string; 
  bookId: string; 
  borrowedDate: Date;
  returnDate?: Date;
  fine: number;
  status: string; 
  img: string;
  title: string; 
  author: string; 
}

const BorrowedBookSchema: Schema = new Schema({
  userId: { type: String, required: true }, 
  bookId: { type: String, required: true }, 
  borrowedDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  fine: { type: Number, default: 0 },
  status: { type: String, default: "Borrowed" },
  img: { type: String, required: true }, 
  title: { type: String, required: true }, 
  author: { type: String, required: true }, 
});

export default mongoose.models.BorrowedBook ||
  mongoose.model<IBorrowedBook>("BorrowedBook", BorrowedBookSchema);