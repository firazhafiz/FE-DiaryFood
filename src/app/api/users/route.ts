import { NextResponse } from "next/server";
import { users, User } from "@/data/users";

// GET /api/users - Get all users
export async function GET() {
  try {
    // Remove sensitive data before sending response
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    return NextResponse.json(usersWithoutPassword);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/users - Create new user
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    // Check if email already exists
    if (users.some((user) => user.email === body.email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Create new user
    const newUser: User = {
      id: users.length + 1, // In real implementation, this would be handled by the database
      name: body.name,
      email: body.email,
      password: body.password, // In real implementation, this should be hashed
      role: body.role || "user",
      photo: body.photo,
    };

    // In real implementation, this would be saved to database
    users.push(newUser);

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
