-- AlterTable
ALTER TABLE `Series` ADD COLUMN `topicId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Series` ADD CONSTRAINT `Series_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
