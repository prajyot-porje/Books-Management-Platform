import { NextResponse } from "next/server";
import BorrowRequest from "@/lib/database/models/BorrowRequest.modal";
import { connectToDatabase } from "@/lib/database";

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    if (!requestId || typeof requestId !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing requestId." },
        { status: 400 }
      );
    }

    await connectToDatabase(); // Ensure the database connection is established

    // Update the borrow request status to "Rejected"
    const updatedRequest = await BorrowRequest.updateOne(
      { id: requestId }, // Match by custom ID field
      { $set: { status: "Rejected" } }
    );

    if (updatedRequest.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to update the request." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Request rejected successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error rejecting request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}