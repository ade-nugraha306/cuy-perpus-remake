/*
  Warnings:

  - Added the required column `deskripsi` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "deskripsi" TEXT NOT NULL;
