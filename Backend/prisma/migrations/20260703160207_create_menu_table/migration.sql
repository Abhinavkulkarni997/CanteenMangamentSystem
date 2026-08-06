/*
  Warnings:

  - You are about to drop the column `mealDate` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `menuDate` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "mealDate",
ADD COLUMN     "maxQuantity" INTEGER,
ADD COLUMN     "menuDate" DATE NOT NULL;
