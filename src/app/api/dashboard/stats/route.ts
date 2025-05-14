import { NextResponse } from "next/server";

export async function GET() {
  try {
    // TODO: Replace with actual database queries
    const stats = {
      totalUsers: 150,
      totalRecipes: 75,
      publishedRecipes: 45,
      userGrowth: [
        { date: "2024-01", count: 50 },
        { date: "2024-02", count: 75 },
        { date: "2024-03", count: 100 },
        { date: "2024-04", count: 150 },
      ],
      recipeCategories: [
        { category: "Italian", count: 20 },
        { category: "Indian", count: 15 },
        { category: "Japanese", count: 10 },
        { category: "Indonesian", count: 30 },
      ],
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
