/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BasicCell` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[icon]` on the table `BasicCell` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iconCode]` on the table `BasicCell` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `icon` to the `BasicCell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconCode` to the `BasicCell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BasicCell` ADD COLUMN `icon` VARCHAR(191) NOT NULL,
    ADD COLUMN `iconCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `BasicCell_name_key` ON `BasicCell`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `BasicCell_icon_key` ON `BasicCell`(`icon`);

-- CreateIndex
CREATE UNIQUE INDEX `BasicCell_iconCode_key` ON `BasicCell`(`iconCode`);
