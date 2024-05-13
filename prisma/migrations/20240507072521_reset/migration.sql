/*
  Warnings:

  - Made the column `productId` on table `Description` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Description` DROP FOREIGN KEY `Description_productId_fkey`;

-- AlterTable
ALTER TABLE `Description` MODIFY `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE `Description` ADD CONSTRAINT `Description_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
