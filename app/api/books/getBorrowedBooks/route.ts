import { NextResponse } from "next/server";
import BorrowedBook from "@/lib/database/models/borrowedBook.model"; // Import the BorrowedBook model
import { connectToDatabase } from "@/lib/database"; // Import the database connection utility

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all borrowed books
    const borrowedBooks = await BorrowedBook.find({});

    // Return the borrowed books as a JSON response
    return NextResponse.json(borrowedBooks, { status: 200 });
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}