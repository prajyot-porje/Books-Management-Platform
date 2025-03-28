import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/index"; // Ensure this is the correct path to your database connection utility
import Book from "@/lib/database/models/books.model"; // Replace with the correct path to your Book model

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  try {
    // Connect to the database
    await connectToDatabase();

    let books;

    if (status === "all books") {
      books = await Book.find({});
    } else if (status === "borrowed") {
      books = await Book.find({ isBorrowed: true });
    } else {
      return NextResponse.json({ error: "Invalid status parameter" }, { status: 400 });
    }

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}