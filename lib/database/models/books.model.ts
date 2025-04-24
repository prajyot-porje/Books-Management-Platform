import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  category: string;
  price: number;
  quantity: number;
  img: string;
  publishedDate: Date;
  status: string; 
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publisher: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  img: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  status: { type: String, default: "Available" },
});

export default mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);