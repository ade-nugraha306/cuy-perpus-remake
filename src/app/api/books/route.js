import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const books = await prisma.books.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json({
      status: 200,
      message: "Successfully fetching all data",
      data: books,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Error fetching books",
      error: error.message,
    });
  }
}

export async function POST(request) {
  try {
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
        message: "Missing required Fields",
      });
    }
    const book = await prisma.books.create({
      data: {
        judul,
        penulis,
        penerbit,
        deskripsi,
        thumbnail,
        tahun_terbit,
        kategori_buku,
      },
    });
    return Response.json({
      status: 201,
      message: "Successfully Created Data!",
      data: book,
    });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Error creating data",
      error: err.message,
    });
  }
}
