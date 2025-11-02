/*
  Warnings:

  - You are about to alter the column `siswaId` on the `kehadiran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `kelasId` on the `kehadiran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `pelajaranId` on the `kehadiran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `jurusanId` on the `kelas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `wali_kelasId` on the `kelas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `siswaId` on the `nilai_siswa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `kelasId` on the `nilai_siswa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `pelajaranId` on the `nilai_siswa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `kelasId` on the `pelajaran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `wali_kelasId` on the `pelajaran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.
  - You are about to alter the column `kelasId` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.

*/
-- DropForeignKey
ALTER TABLE `kehadiran` DROP FOREIGN KEY `Kehadiran_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `kehadiran` DROP FOREIGN KEY `Kehadiran_pelajaranId_fkey`;

-- DropForeignKey
ALTER TABLE `kehadiran` DROP FOREIGN KEY `Kehadiran_siswaId_fkey`;

-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_jurusanId_fkey`;

-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_wali_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `nilai_siswa` DROP FOREIGN KEY `Nilai_Siswa_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `nilai_siswa` DROP FOREIGN KEY `Nilai_Siswa_pelajaranId_fkey`;

-- DropForeignKey
ALTER TABLE `nilai_siswa` DROP FOREIGN KEY `Nilai_Siswa_siswaId_fkey`;

-- DropForeignKey
ALTER TABLE `pelajaran` DROP FOREIGN KEY `Pelajaran_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `pelajaran` DROP FOREIGN KEY `Pelajaran_wali_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `siswa` DROP FOREIGN KEY `Siswa_kelasId_fkey`;

-- DropIndex
DROP INDEX `Kehadiran_kelasId_fkey` ON `kehadiran`;

-- DropIndex
DROP INDEX `Kehadiran_pelajaranId_fkey` ON `kehadiran`;

-- DropIndex
DROP INDEX `Kehadiran_siswaId_fkey` ON `kehadiran`;

-- DropIndex
DROP INDEX `Kelas_jurusanId_fkey` ON `kelas`;

-- DropIndex
DROP INDEX `Kelas_wali_kelasId_fkey` ON `kelas`;

-- DropIndex
DROP INDEX `Nilai_Siswa_kelasId_fkey` ON `nilai_siswa`;

-- DropIndex
DROP INDEX `Nilai_Siswa_pelajaranId_fkey` ON `nilai_siswa`;

-- DropIndex
DROP INDEX `Nilai_Siswa_siswaId_fkey` ON `nilai_siswa`;

-- DropIndex
DROP INDEX `Pelajaran_kelasId_fkey` ON `pelajaran`;

-- DropIndex
DROP INDEX `Pelajaran_wali_kelasId_fkey` ON `pelajaran`;

-- DropIndex
DROP INDEX `Siswa_kelasId_fkey` ON `siswa`;

-- AlterTable
ALTER TABLE `kehadiran` MODIFY `siswaId` CHAR(36) NOT NULL,
    MODIFY `kelasId` CHAR(36) NOT NULL,
    MODIFY `pelajaranId` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `kelas` MODIFY `jurusanId` CHAR(36) NOT NULL,
    MODIFY `wali_kelasId` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `nilai_siswa` MODIFY `siswaId` CHAR(36) NOT NULL,
    MODIFY `kelasId` CHAR(36) NOT NULL,
    MODIFY `pelajaranId` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `pelajaran` MODIFY `kelasId` CHAR(36) NOT NULL,
    MODIFY `wali_kelasId` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `siswa` MODIFY `kelasId` CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_jurusanId_fkey` FOREIGN KEY (`jurusanId`) REFERENCES `Jurusan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_wali_kelasId_fkey` FOREIGN KEY (`wali_kelasId`) REFERENCES `Wali_Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelajaran` ADD CONSTRAINT `Pelajaran_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pelajaran` ADD CONSTRAINT `Pelajaran_wali_kelasId_fkey` FOREIGN KEY (`wali_kelasId`) REFERENCES `Wali_Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_pelajaranId_fkey` FOREIGN KEY (`pelajaranId`) REFERENCES `Pelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai_Siswa` ADD CONSTRAINT `Nilai_Siswa_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai_Siswa` ADD CONSTRAINT `Nilai_Siswa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai_Siswa` ADD CONSTRAINT `Nilai_Siswa_pelajaranId_fkey` FOREIGN KEY (`pelajaranId`) REFERENCES `Pelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
