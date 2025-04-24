import { NextResponse } from "next/server";
import BorrowRequest from "@/lib/database/models/BorrowRequest.modal";
import Book from "@/lib/database/models/books.model"; 
import User from "@/lib/database/models/users.model"; 
import { connectToDatabase } from "@/lib/database"; 

export async function GET() {
  try {
    await connectToDatabase();
    const borrowRequests = await BorrowRequest.find({});

    const requestsWithDetails = await Promise.all(
      borrowRequests.map(async (request: { userId: string; bookId: string; toObject: () => any; }) => {

        const user = await User.findOne({ clerkId: request.userId });
        const userName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Unknown User";
        const book = await Book.findOne({ isbn: request.bookId });
        const bookTitle = book?.title || "Unknown Title";
        const bookAuthor = book?.author || "Unknown Author";
        const img = book?.img || "https://via.placeholder.com/150"; 

        return {
          ...request.toObject(),
          userName,
          img,
          bookTitle,
          bookAuthor,
        };
      })
    );

    // Return the requests with user and book details
    return NextResponse.json(requestsWithDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching borrow requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}