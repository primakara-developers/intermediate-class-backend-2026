/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `Books` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_categoriesId_fkey";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "categoriesId",
ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
