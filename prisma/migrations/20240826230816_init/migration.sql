/*
  Warnings:

  - Changed the type of `level` on the `LogModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "LogModel" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "level",
ADD COLUMN     "level" "SeverityLevel" NOT NULL;

-- DropEnum
DROP TYPE "SeverityLevl";
