import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/index"; // Adjust the path based on your project structure
import BorrowRequest from "@/lib/database/models/BorrowRequest.modal"; // Replace with the correct path to your BorrowRequest model
import { v4 as uuidv4 } from "uuid"; // Import UUID library for generating unique IDs

export async function POST(req: Request) {
  try {
    const { userId, bookId } = await req.json();

    // Validate the payload
    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing userId." },
        { status: 400 }
      );
    }

    if (!bookId || typeof bookId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing bookId." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Create a new borrow request
    const borrowRequest = await BorrowRequest.create({
      id: uuidv4(), // Generate a unique ID for the borrow request
      userId, // Store as a string
      bookId, // Store as a string
      status: "Pending", // Default status
      createdAt: new Date(), // Add a timestamp
    });

    return NextResponse.json(borrowRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating borrow request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}