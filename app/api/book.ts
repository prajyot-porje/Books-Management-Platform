import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/database/index";
import Book from "@/lib/database/models/books.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const book = await Book.create(req.body);
      res.status(201).json({ success: true, data: book });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, error: "Failed to add book" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}