import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get all user
export async function GET(request) {
  try {
    const users = await prisma.users.findMany();
    return Response.json({
      status: 200,
      message: "Successfully fetching all data",
      data: users,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error fetching users",
      error: err.message,
    });
  }
}