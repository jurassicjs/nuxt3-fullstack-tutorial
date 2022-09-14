/*
  Warnings:

  - You are about to drop the column `tag_id` on the `TagAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `topic_id` on the `Video` table. All the data in the column will be lost.
  - Added the required column `tagId` to the `TagAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TagAssignment` DROP FOREIGN KEY `TagAssignment_tag_id_fkey`;

-- DropForeignKey
ALTER TABLE `Topic` DROP FOREIGN KEY `Topic_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Video` DROP FOREIGN KEY `Video_topic_id_fkey`;

-- AlterTable
ALTER TABLE `TagAssignment` DROP COLUMN `tag_id`,
    ADD COLUMN `tagId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Topic` DROP COLUMN `category_id`;

-- AlterTable
ALTER TABLE `Video` DROP COLUMN `topic_id`,
    ADD COLUMN `topicId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CategoryAssignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entity_type` VARCHAR(191) NOT NULL,
    `entity_id` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagAssignment` ADD CONSTRAINT `TagAssignment_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Topic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryAssignment` ADD CONSTRAINT `CategoryAssignment_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
