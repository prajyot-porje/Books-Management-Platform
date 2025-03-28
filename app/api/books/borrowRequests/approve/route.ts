import { NextResponse } from "next/server";
import BorrowRequest from "@/lib/database/models/BorrowRequest.modal";
import Book from "@/lib/database/models/books.model";
import { connectToDatabase } from "@/lib/database";

export async function POST(req: Request) {
  try {
    const { requestId, bookId } = await req.json();

    if (!requestId || typeof requestId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing requestId." },
        { status: 400 }
      );
    }

    if (!bookId || typeof bookId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing bookId." },
        { status: 400 }
      );
    }

    await connectToDatabase(); // Ensure the database connection is established

    // Update the borrow request status to "Approved"
    const updatedRequest = await BorrowRequest.updateOne(
      { id: requestId }, // Match by custom ID field
      { $set: { status: "Approved" } }
    );

    // Mark the book as borrowed
    const updatedBook = await Book.updateOne(
      { id: bookId }, // Match by custom `id` field
      { $set: { isBorrowed: true } } // Update the `isBorrowed` field
    );

    if (updatedRequest.modifiedCount === 0 || updatedBook.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to update the request or book." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Request approved successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error approving request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}