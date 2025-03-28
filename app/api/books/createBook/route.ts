import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import Book from "@/lib/database/models/books.model";

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const book = await Book.create(body);
    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to add book" }, { status: 400 });
  }
}