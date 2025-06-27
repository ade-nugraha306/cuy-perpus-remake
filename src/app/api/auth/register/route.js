import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

// register user
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password, role } = body;

    if (!username || !email || !password) {
      return Response.json({
        status: 400,
        message: "Missing required Fields",
      });
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json({
        status: 409,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || "USER",
      },
    });

    return Response.json({
      status: 201,
      message: "Successfully Created Data!",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error creating data",
      error: err.message,
    });
  }
}
