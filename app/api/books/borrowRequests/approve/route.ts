import { NextResponse } from "next/server";
import BorrowRequest from "@/lib/database/models/BorrowRequest.modal";
import Book from "@/lib/database/models/books.model";
import BorrowedBook from "@/lib/database/models/borrowedBook.model"; // Import BorrowedBook model
import { connectToDatabase } from "@/lib/database";

export async function POST(req: Request) {
  try {
    const { requestId, bookId, userId } = await req.json();

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

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing userId." },
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

    // Fetch book details for the given bookId
    console.log("Received bookId:", bookId);
    const bookDetails = await Book.findOne({ isbn: bookId }); // Use `_id` if that's the correct field
    if (!bookDetails) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 }
      );
    }

    // Create a new borrowed book entry
    const borrowedBook = new BorrowedBook({
      userId, // Use the userId passed from the frontend
      bookId: bookDetails.isbn, // Use `_id` if that's the correct field
      borrowedDate: new Date(),
      img: bookDetails.img, // Assuming the book model has an `img` field
      title: bookDetails.title, // Assuming the book model has a `title` field
      author: bookDetails.author, // Assuming the book model has an `author` field
      status: "Borrowed",
    });

    await borrowedBook.save();

    return NextResponse.json({ message: "Request approved and book borrowed successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error approving request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}