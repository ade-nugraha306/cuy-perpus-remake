const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      {
        username: "adminUser",
        email: "admin@cuyperpus.com",
        password: "hashed_password_123",
        role: "ADMIN",
      },
      {
        username: "petugasUser",
        email: "petugas@cuyperpus.com",
        password: "hashed_password_456",
        role: "PETUGAS",
      },
      {
        username: "User",
        email: "user@cuyperpus.com",
        password: "hashed_password_789",
        role: "USER",
      },
      {
        username: "Mulyono",
        email: "mulyono@cuyperpus.com",
        password: "admin#1234",
        role: "USER",
      },
    ],
  });

  await prisma.books.createMany({
    data: [
      {
        judul: "Belajar JavaScript",
        penulis: "Cuy JS",
        penerbit: "Cuy Publishing",
        deskripsi: "Belajar dasar Javascript",
        thumbnail: "https://placehold.co/150x200",
        tahun_terbit: 2024,
        kategori_buku: "teknologi",
      },
      {
        judul: "Takagi San",
        penulis: "Manusia",
        penerbit: "Manusia",
        deskripsi: "Kisah cinta animek",
        thumbnail: "https://placehold.co/150x200",
        tahun_terbit: 2020,
        kategori_buku: "anime",
      },
      {
        judul: "Manusia pernah ke bulan?",
        penulis: "Manusia",
        penerbit: "Manusia",
        deskripsi: "Ril or Fek?",
        thumbnail: "https://placehold.co/150x200",
        tahun_terbit: 1994,
        kategori_buku: "sejarah",
      },
    ],
  });

  await prisma.borrows.createMany({
    data: [
      {
        userId: 3,
        bookId: 1,
        status_peminjaman: "REQUESTED",
        tanggal_peminjaman: new Date(),
        deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        userId: 3,
        bookId: 3,
        status_peminjaman: "DIPINJAM",
        tanggal_peminjaman: new Date(),
        deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
        tanggal_pengembalian: new Date(),
      },
    ],
  });
}

main()
  .then(() => {
    console.log("✅ Seeding finished!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
