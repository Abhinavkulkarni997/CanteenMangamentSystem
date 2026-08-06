/*
  Warnings:

  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.
  - Added the required column `photoUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "photo",
ADD COLUMN     "photoUrl" TEXT NOT NULL;
