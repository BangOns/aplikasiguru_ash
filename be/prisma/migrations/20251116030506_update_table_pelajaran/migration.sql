/*
  Warnings:

  - Added the required column `nama_pelajaran` to the `Pelajaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pelajaran` ADD COLUMN `nama_pelajaran` VARCHAR(191) NOT NULL;
