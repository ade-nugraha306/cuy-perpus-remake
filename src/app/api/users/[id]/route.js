import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
  const id = parseInt(request.nextUrl.pathname.split('/').pop());

  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return Response.json({
        status: 404,
        message: "User Not Found",
      });
    }

    return Response.json({
      status: 200,
      message: "Successfully fetched user",
      data: user,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  }
}
