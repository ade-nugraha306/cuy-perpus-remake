/*
  Warnings:

  - Added the required column `judul` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penerbit` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penulis` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun_terbit` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "judul" TEXT NOT NULL,
ADD COLUMN     "penerbit" TEXT NOT NULL,
ADD COLUMN     "penulis" TEXT NOT NULL,
ADD COLUMN     "tahun_terbit" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
