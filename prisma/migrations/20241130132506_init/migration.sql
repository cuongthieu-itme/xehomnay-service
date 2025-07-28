/*
  Warnings:

  - You are about to drop the column `gpsAvailable` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `otherFeatures` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerMonth` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerWeek` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `wifiAvailable` on the `Car` table. All the data in the column will be lost.
  - Added the required column `hOrday` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentalTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acWorking` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "hOrday" TEXT NOT NULL,
ADD COLUMN     "rentalTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "gpsAvailable",
DROP COLUMN "images",
DROP COLUMN "otherFeatures",
DROP COLUMN "pricePerMonth",
DROP COLUMN "pricePerWeek",
DROP COLUMN "wifiAvailable",
ADD COLUMN     "acWorking" BOOLEAN NOT NULL,
ALTER COLUMN "engineCapaciy" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE "CarImage" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarFeature" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarImage" ADD CONSTRAINT "CarImage_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarFeature" ADD CONSTRAINT "CarFeature_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
