/*
  Warnings:

  - A unique constraint covering the columns `[projectStaffId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "projectStaffId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_projectStaffId_key" ON "User"("projectStaffId");
