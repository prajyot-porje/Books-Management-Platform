import mongoose, { Schema, Document } from "mongoose";

export interface IBorrowRequest extends Document {
  id: string; // Custom ID field
  userId: string;
  bookId: string;
  status: string; // e.g., "Pending", "Approved", "Rejected"
  createdAt: Date;
}

const BorrowRequestSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true }, // Custom ID field
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BorrowRequest ||
  mongoose.model<IBorrowRequest>("BorrowRequest", BorrowRequestSchema);