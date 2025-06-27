import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Ambil id dari URL
function extractId(request) {
  const id = request.nextUrl.pathname.split("/").pop();
  return parseInt(id);
}

export async function GET(request) {
  const id = extractId(request);

  try {
    const borrow = await prisma.borrows.findUnique({
      where: { id },
      include: {
        user: { select: { username: true, role: true } },
        book: {
          select: {
            judul: true,
            penulis: true,
            penerbit: true,
            kategori_buku: true,
            tahun_terbit: true,
          },
        },
      },
    });

    if (!borrow) {
      return Response.json({ status: 404, message: "Borrow not found" });
    }

    return Response.json({
      status: 200,
      message: "Successfully fetch data!",
      data: {
        id: borrow.id,
        buku_terpinjam: borrow.book,
        dipinjam_oleh: borrow.user,
        status_peminjaman: borrow.status_peminjaman,
        tanggal_peminjaman: borrow.tanggal_peminjaman,
        tanggal_kembali: borrow.tanggal_pengembalian,
        deadline: borrow.deadline,
      },
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error fetching borrow",
      error: err.message,
    });
  }
}

export async function PUT(request) {
  const id = extractId(request);

  try {
    const body = await request.json();
    const { status_peminjaman, tanggal_kembali } = body;

    const updated = await prisma.borrows.update({
      where: { id },
      data: {
        status_peminjaman,
        tanggal_pengembalian: tanggal_kembali,
      },
      include: {
        user: { select: { username: true, role: true } },
        book: {
          select: {
            judul: true,
            penulis: true,
            penerbit: true,
            kategori_buku: true,
            tahun_terbit: true,
          },
        },
      },
    });

    return Response.json({
      status: 200,
      message: "Successfully Edit Data!",
      data: {
        id: updated.id,
        buku_terpinjam: updated.book,
        dipinjam_oleh: updated.user,
        status_peminjaman: updated.status_peminjaman,
        tanggal_peminjaman: updated.tanggal_peminjaman,
        tanggal_kembali: updated.tanggal_pengembalian,
        deadline: updated.deadline,
      },
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error updating borrow",
      error: err.message,
    });
  }
}

export async function DELETE(request) {
  const id = extractId(request);

  try {
    await prisma.borrows.delete({ where: { id } });

    return Response.json({
      status: 200,
      message: "Successfully deleted data",
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error deleting borrow",
      error: err.message,
    });
  }
}
