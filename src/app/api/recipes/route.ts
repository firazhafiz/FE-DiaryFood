import { NextResponse } from "next/server";
import { dummyRecipes } from "@/data/recipes";

export async function GET() {
  try {
    return NextResponse.json(dummyRecipes);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
