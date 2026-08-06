-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forcePasswordChange" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passwordChangedAt" TIMESTAMP(3),
ADD COLUMN     "passwordChangedBy" INTEGER;
