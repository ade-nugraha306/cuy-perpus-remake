import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(request) {
  // Ambil ID dari URL /api/borrows/:id/reject
  const pathParts = request.nextUrl.pathname.split("/");
  const id = Number(pathParts[pathParts.length - 2]);

  try {
    const borrow = await prisma.borrows.findUnique({ where: { id } });

    if (!borrow) {
      return Response.json({ status: 404, message: "Borrow not found" });
    }

    if (borrow.status_peminjaman !== "REQUESTED") {
      return Response.json({
        status: 400,
        message: "Only REQUESTED status can be rejected",
      });
    }

    const updated = await prisma.borrows.update({
      where: { id },
      data: {
        status_peminjaman: "DITOLAK",
      },
    });

    return Response.json({
      status: 200,
      message: "Borrow rejected successfully",
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
