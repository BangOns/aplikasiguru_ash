/*
  Warnings:

  - The primary key for the `jurusan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `kelas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `wali_kelas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_kelasId_fkey`;

-- ✅ Tambah: Drop FK kelas → jurusan
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_jurusanId_fkey`;

-- ✅ Tambah: Drop FK kelas → wali_kelas
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_wali_kelasId_fkey`;

-- AlterTable jurusan
ALTER TABLE `jurusan` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable kelas
ALTER TABLE `kelas` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable wali_kelas
ALTER TABLE `wali_kelas` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- ✅ Recreate FK kelas → jurusan
ALTER TABLE `kelas`
ADD CONSTRAINT `Kelas_jurusanId_fkey`
FOREIGN KEY (`jurusanId`) REFERENCES `jurusan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- ✅ Recreate FK kelas → wali_kelas
ALTER TABLE `kelas`
ADD CONSTRAINT `Kelas_wali_kelasId_fkey`
FOREIGN KEY (`wali_kelasId`) REFERENCES `wali_kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- DropTable
DROP TABLE `user`;

-- CreateTable siswa
CREATE TABLE `Siswa` (
    `id` CHAR(36) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kelasId` VARCHAR(191) NOT NULL,
    `jkl` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable jadwal
CREATE TABLE `Jadwal` (
    `id` CHAR(36) NOT NULL,
    `activity` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable pelajaran
CREATE TABLE `Pelajaran` (
    `id` CHAR(36) NOT NULL,
    `kelasId` VARCHAR(191) NOT NULL,
    `wali_kelasId` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable kehadiran
CREATE TABLE `Kehadiran` (
    `id` CHAR(36) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `siswaId` VARCHAR(191) NOT NULL,
    `kelasId` VARCHAR(191) NOT NULL,
    `pelajaranId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable nilai siswa
CREATE TABLE `Nilai_Siswa` (
    `id` CHAR(36) NOT NULL,
    `siswaId` VARCHAR(191) NOT NULL,
    `kelasId` VARCHAR(191) NOT NULL,
    `pelajaranId` VARCHAR(191) NOT NULL,
    `tugas` INTEGER NOT NULL,
    `uts` INTEGER NOT NULL,
    `uas` INTEGER NOT NULL,
    `rata_rata` INTEGER NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey siswa → kelas
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey pelajaran → kelas
ALTER TABLE `Pelajaran` ADD CONSTRAINT `Pelajaran_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey pelajaran → wali_kelas
ALTER TABLE `Pelajaran` ADD CONSTRAINT `Pelajaran_wali_kelasId_fkey` FOREIGN KEY (`wali_kelasId`) REFERENCES `Wali_Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey kehadiran → siswa
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey kehadiran → kelas
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey kehadiran → pelajaran
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_pelajaranId_fkey` FOREIGN KEY (`pelajaranId`) REFERENCES `Pelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey nilai_siswa → siswa
ALTER TABLE `Nilai_Siswa` ADD CONSTRAINT `Nilai_Siswa_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey nilai_siswa → kelas
ALTER TABLE `Nilai_Siswa` ADD CONSTRAINT `Nilai_Siswa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey nilai_siswa → pelajaran
ALTER TABLE `Nilai_Siswa` ADD CONSTRAINT `Nilai_Siswa_pelajaranId_fkey` FOREIGN KEY (`pelajaranId`) REFERENCES `Pelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
