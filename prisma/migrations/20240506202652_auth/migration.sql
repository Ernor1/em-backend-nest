-- DropForeignKey
ALTER TABLE `Description` DROP FOREIGN KEY `Description_productId_fkey`;

-- AlterTable
ALTER TABLE `Description` MODIFY `productId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Description` ADD CONSTRAINT `Description_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
