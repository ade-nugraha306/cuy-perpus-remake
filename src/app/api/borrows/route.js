import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const borrows = await prisma.borrows.findMany({
      include: {
        user: {
          select: { username: true, role: true },
        },
        book: {
          select: {
            judul: true,
            penulis: true,
            penerbit: true,
            deskripsi: true,
            kategori_buku: true,
            tahun_terbit: true,
          },
        },
      },
    });

    return Response.json({
      status: 200,
      message: "Successfully fetch all data!",
      data: borrows.map((borrow) => ({
        id: borrow.id,
        buku_terpinjam: borrow.book,
        dipinjam_oleh: borrow.user,
        status_peminjaman: borrow.status_peminjaman,
        tanggal_peminjaman: borrow.tanggal_peminjaman,
        tanggal_kembali: borrow.tanggal_pengembalian || null,
        deadline: borrow.deadline,
      })),
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error fetching borrows",
      error: err.message,
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, book_id } = body;

    if (!user_id || !book_id) {
      return Response.json({
        status: 400,
        message: "Missing require fields",
      });
    }

    const borrow = await prisma.borrows.create({
      data: {
        userId: user_id,
        bookId: book_id,
        status_peminjaman: "REQUESTED",
        tanggal_peminjaman: new Date(),
        deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      include: {
        user: {
          select: { username: true, role: true },
        },
        book: {
          select: {
            judul: true,
            penulis: true,
            penerbit: true,
            deskripsi: true,
            kategori_buku: true,
            tahun_terbit: true,
          },
        },
      },
    });
    return Response.json({
      status: 201,
      message: "Successfully create borrow!",
      data: {
        id: borrow.id,
        buku_terpinjam: borrow.book,
        dipinjam_oleh: borrow.user,
        status_peminjaman: borrow.status_peminjaman,
        tanggal_peminjaman: borrow.tanggal_peminjaman,
        deadline: borrow.deadline,
      },
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error creating borrow",
      error: err.message,
    });
  }
}
