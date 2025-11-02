-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `Kelas_jurusanId_fkey`;

-- DropIndex
DROP INDEX `Kelas_jurusanId_fkey` ON `kelas`;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_jurusanId_fkey` FOREIGN KEY (`jurusanId`) REFERENCES `Jurusan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
