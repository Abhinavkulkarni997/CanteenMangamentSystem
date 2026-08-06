-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deactivatedAt" TIMESTAMP(3),
ADD COLUMN     "deactivatedBy" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;
