/*
  Warnings:

  - You are about to drop the column `username` on the `Parents` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Parents_username_key";

-- AlterTable
ALTER TABLE "Parents" DROP COLUMN "username";
