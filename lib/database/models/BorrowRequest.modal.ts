import mongoose, { Schema, Document } from "mongoose";

export interface IBorrowRequest extends Document {
  id: string; 
  userId: string;
  bookId: string;
  status: string;
  createdAt: Date;
}

const BorrowRequestSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true }, 
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BorrowRequest ||
  mongoose.model<IBorrowRequest>("BorrowRequest", BorrowRequestSchema);