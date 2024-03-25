/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Parents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_parent_id_fkey";

-- AlterTable
ALTER TABLE "Childs" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parents" ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Parents_user_id_key" ON "Parents"("user_id");

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
