import { NextResponse } from "next/server";
import BorrowedBook from "@/lib/database/models/borrowedBook.model"; // Import the BorrowedBook model
import { connectToDatabase } from "@/lib/database"; // Import the database connection utility
import { CalculateFine } from "@/lib/actions/borrowedBook.action";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all borrowed books
    const borrowedBooks = await BorrowedBook.find({});

    return NextResponse.json(borrowedBooks, { status: 200 });
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}