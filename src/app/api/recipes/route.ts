import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Implementasi fetch recipes dari database
    const recipes = [
      {
        id: "1",
        title: "Spaghetti Carbonara",
        author: "Chef John",
        date: "2024-03-20",
        category: "Italian",
        status: "published",
      },
      {
        id: "2",
        title: "Chicken Curry",
        author: "Chef Sarah",
        date: "2024-03-19",
        category: "Indian",
        status: "draft",
      },
      // ... data dummy untuk testing
    ];
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
