import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const id = request.nextUrl.pathname.split('/').pop(); // ambil ID dari URL

  try {
    const book = await prisma.books.findUnique({
      where: { id: parseInt(id) },
    });

    if (!book) {
      return Response.json({
        status: 404,
        message: "Book not found",
      });
    }

    return Response.json({
      status: 200,
      message: "Successfully fetched book data",
      data: book,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Server error",
      error: err.message,
    });
  }
}


export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const {
    judul,
    penulis,
    penerbit,
    deskripsi,
    thumbnail,
    tahun_terbit,
    kategori_buku,
  } = body;
  if (
    !judul ||
    !penulis ||
    !penerbit ||
    !deskripsi ||
    !thumbnail ||
    !tahun_terbit ||
    !kategori_buku
  ) {
    return Response.json({
      status: 400,
      message: "Missing required fields",
    });
  }
  try {
    const updated = await prisma.books.update({
      where: { id: Number(id) },
      data: {
        judul,
        penulis,
        penerbit,
        deskripsi,
        thumbnail,
        tahun_terbit: Number(tahun_terbit),
        kategori_buku,
      },
    });
    return Response.json({
      status: 200,
      message: "Successfully Edited Data!",
      data: updated,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error Updating Book",
      error: err.message,
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.books.delete({
      where: { id: Number(id) },
    });

    return Response.json({
      status: 200,
      message: "Successfully deleted data!",
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error deleting book",
      error: err.message,
    });
  }
}
