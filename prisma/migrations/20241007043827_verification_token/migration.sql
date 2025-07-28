/*
  Warnings:

  - You are about to drop the column `email` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_userId_fkey";

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "email",
DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
