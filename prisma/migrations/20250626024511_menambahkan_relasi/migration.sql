/*
  Warnings:

  - Added the required column `kategori_buku` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PETUGAS', 'USER');

-- CreateEnum
CREATE TYPE "Kategori" AS ENUM ('edukasi', 'anime', 'sejarah', 'teknologi', 'fiksi');

-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "kategori_buku" "Kategori" NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Borrows" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "status_peminjaman" TEXT NOT NULL,
    "tanggal_peminjaman" TIMESTAMP(3),
    "tanggal_pengembalian" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Borrows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "Borrows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "Borrows_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
