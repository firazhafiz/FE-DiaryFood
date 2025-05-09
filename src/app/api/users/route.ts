import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Implementasi fetch users dari database
    const users = [
      { id: "1", email: "user1@example.com", username: "user1" },
      { id: "2", email: "user2@example.com", username: "user2" },
      // ... data dummy untuk testing
    ];

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
