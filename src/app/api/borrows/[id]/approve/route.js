import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(request) {
  const pathParts = request.nextUrl.pathname.split("/");
  const id = Number(pathParts[pathParts.length - 2]);

  try {
    const borrow = await prisma.borrows.findUnique({ where: { id } });

    if (!borrow) {
      return Response.json({
        status: 404,
        message: "Borrow not found",
      });
    }

    if (borrow.status_peminjaman !== "REQUESTED") {
      return Response.json({
        status: 400,
        message: "Only REQUESTED can be approved",
      });
    }

    const updated = await prisma.borrows.update({
      where: { id },
      data: {
        status_peminjaman: "DIPINJAM",
        tanggal_peminjaman: new Date(),
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 hari
      },
    });

    return Response.json({
      status: 200,
      message: "Borrow approved successfully",
      data: updated,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
}
