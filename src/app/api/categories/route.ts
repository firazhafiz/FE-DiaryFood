import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

interface Kategori {
  id: number;
  nama: string;
  totalRecipe: number;
}

// GET /api/categories - Get all categories
export async function GET() {
  try {
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/categories - Create new category
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newCategory: Kategori = {
      id: Date.now(),
      nama: body.name,
      totalRecipe: 0,
    };

    categories.push(newCategory);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/categories - Update category
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name } = body;

    const categoryIndex = categories.findIndex((cat) => cat.id === id);
    if (categoryIndex === -1) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      nama: name || categories[categoryIndex].nama,
    };

    return NextResponse.json(categories[categoryIndex]);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/categories - Delete category
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const categoryIndex = categories.findIndex((cat) => cat.id === Number(id));
    if (categoryIndex === -1) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const updatedCategories = categories.filter((cat) => cat.id !== Number(id));
    categories.length = 0;
    categories.push(...updatedCategories);

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
