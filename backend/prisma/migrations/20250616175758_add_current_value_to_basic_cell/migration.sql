/*
  Warnings:

  - You are about to drop the column `value` on the `BasicCell` table. All the data in the column will be lost.
  - Added the required column `currentValue` to the `BasicCell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BasicCell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BasicCell` DROP COLUMN `value`,
    ADD COLUMN `currentValue` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
