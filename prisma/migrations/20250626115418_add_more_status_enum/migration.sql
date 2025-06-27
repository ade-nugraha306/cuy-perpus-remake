/*
  Warnings:

  - The values [DIBATALKAN] on the enum `StatusPeminjaman` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusPeminjaman_new" AS ENUM ('REQUESTED', 'DIPINJAM', 'DITOLAK', 'DIKEMBALIKAN');
ALTER TABLE "Borrows" ALTER COLUMN "status_peminjaman" DROP DEFAULT;
ALTER TABLE "Borrows" ALTER COLUMN "status_peminjaman" TYPE "StatusPeminjaman_new" USING ("status_peminjaman"::text::"StatusPeminjaman_new");
ALTER TYPE "StatusPeminjaman" RENAME TO "StatusPeminjaman_old";
ALTER TYPE "StatusPeminjaman_new" RENAME TO "StatusPeminjaman";
DROP TYPE "StatusPeminjaman_old";
ALTER TABLE "Borrows" ALTER COLUMN "status_peminjaman" SET DEFAULT 'REQUESTED';
COMMIT;
