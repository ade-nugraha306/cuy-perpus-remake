/*
  Warnings:

  - The `status_peminjaman` column on the `Borrows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusPeminjaman" AS ENUM ('REQUESTED', 'DIPINJAM', 'DITOLAK', 'DIKEMBALIKAN');

-- AlterTable
ALTER TABLE "Borrows" DROP COLUMN "status_peminjaman",
ADD COLUMN     "status_peminjaman" "StatusPeminjaman" NOT NULL DEFAULT 'REQUESTED';
