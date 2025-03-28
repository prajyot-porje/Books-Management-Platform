import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/index"; // Adjust the path based on your project structure
import BorrowRequest from "@/lib/database/models/BorrowRequest.modal"; // Replace with the correct path to your BorrowRequest model

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all borrow requests
    const borrowRequests = await BorrowRequest.find({}).populate("bookId userId"); // Adjust fields as per your schema

    return NextResponse.json(borrowRequests, { status: 200 });
  } catch (error) {
    console.error("Error fetching borrow requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}