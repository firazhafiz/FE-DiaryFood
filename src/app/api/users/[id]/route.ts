import { NextResponse } from "next/server";
import { users } from "@/data/users";

// GET /api/users/[id] - Get user by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Ensure params.id is properly awaited
    const id = await Promise.resolve(params.id);
    const userId = parseInt(id);

    const user = users.find((user) => user.id === userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove sensitive data before sending response
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const currentUser = users[userIndex];

    // Update user fields
    const updatedUser = {
      ...currentUser,
      name: body.name || currentUser.name,
      email: body.email || currentUser.email,
      role: body.role || currentUser.role,
      photo: body.photo || currentUser.photo,
      // Only update password if provided
      ...(body.password && { password: body.password }),
    };

    // In real implementation, this would be saved to database
    users[userIndex] = updatedUser;

    // Return updated user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // In real implementation, this would be deleted from database
    users.splice(userIndex, 1);

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
