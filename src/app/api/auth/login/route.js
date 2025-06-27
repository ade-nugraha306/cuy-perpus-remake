import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

// login user
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({
        status: 400,
        message: "Missing email or password",
      });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return Response.json({
        status: 401,
        message: "Email is not registered",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return Response.json({
        status: 401,
        message: "Invalid password",
      });
    }

    const sessionPayload = {
      user_id: user.id,
      role: user.role,
      username: user.username,
    };

    const encoded = Buffer.from(JSON.stringify(sessionPayload)).toString(
      "base64"
    );

    const cookieStore = await cookies();
    cookieStore.set("session", encoded, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    // Login success
    const { password: _, ...userWithoutPassword } = user;

    return Response.json({
      status: 200,
      message: "Login successful",
      data: userWithoutPassword,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
}
