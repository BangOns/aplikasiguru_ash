/*
  Warnings:

  - You are about to alter the column `jkl` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `jkl` on the `wali_kelas` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `siswa` MODIFY `jkl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wali_kelas` MODIFY `jkl` VARCHAR(191) NOT NULL;
