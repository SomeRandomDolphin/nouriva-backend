/*
  Warnings:

  - You are about to drop the column `birth_date` on the `Parents` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Parents` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Parents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parents" DROP CONSTRAINT "Parents_user_id_fkey";

-- DropIndex
DROP INDEX "Parents_user_id_key";

-- AlterTable
ALTER TABLE "Parents" DROP COLUMN "birth_date",
DROP COLUMN "user_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Users";

-- CreateIndex
CREATE UNIQUE INDEX "Parents_email_key" ON "Parents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_username_key" ON "Parents"("username");
