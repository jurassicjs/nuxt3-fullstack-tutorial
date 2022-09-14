/*
  Warnings:

  - You are about to drop the column `link` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Topic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `link`;

-- AlterTable
ALTER TABLE `Topic` DROP COLUMN `link`;
