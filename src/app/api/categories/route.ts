import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

// GET /api/categories - Get all categories
export async function GET() {
  try {
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
