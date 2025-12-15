/*
  Warnings:

  - You are about to alter the column `jkl` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `jkl` on the `wali_kelas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `siswa` MODIFY `jkl` ENUM('LAKI_LAKI', 'PEREMPUAN') NOT NULL;

-- AlterTable
ALTER TABLE `wali_kelas` MODIFY `jkl` ENUM('LAKI_LAKI', 'PEREMPUAN') NOT NULL;
