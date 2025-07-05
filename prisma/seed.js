const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const hashedAdmin = await bcrypt.hash("admin123", 10);
  const hashedPetugas = await bcrypt.hash("petugas123", 10);
  const hashedUser = await bcrypt.hash("user123", 10);
  const hashedMulyono = await bcrypt.hash("admin#1234", 10);

  await prisma.users.createMany({
    data: [
      {
        username: "adminUser",
        email: "admin@cuyperpus.com",
        password: hashedAdmin,
        role: "ADMIN",
      },
      {
        username: "petugasUser",
        email: "petugas@cuyperpus.com",
        password: hashedPetugas,
        role: "PETUGAS",
      },
      {
        username: "User",
        email: "user@cuyperpus.com",
        password: hashedUser,
        role: "USER",
      },
      {
        username: "Mulyono",
        email: "mulyono@cuyperpus.com",
        password: hashedMulyono,
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
