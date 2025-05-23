export type Role = "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  photo?: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password_1", // Dalam implementasi nyata, password harus di-hash
    role: "user",
    photo: "/assets/images/image_login.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "hashed_password_2",
    role: "user",
    photo: "/assets/images/image_login.jpg",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    password: "hashed_password_3",
    role: "admin",
    photo: "/assets/images/image_login.jpg",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "hashed_password_4",
    role: "user",
    photo: "/assets/images/image_login.jpg",
  },
  {
    id: 5,
    name: "Mike Wilson",
    email: "mike@example.com",
    password: "hashed_password_5",
    role: "user",
    photo: "/assets/images/image_login.jpg",
  },
];
