-- CreateTable
CREATE TABLE "ScanLog" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device" TEXT,
    "ipAddress" TEXT,

    CONSTRAINT "ScanLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScanLog" ADD CONSTRAINT "ScanLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanLog" ADD CONSTRAINT "ScanLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
