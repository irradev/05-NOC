-- CreateEnum
CREATE TYPE "SeverityLevl" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "LogModel" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "level" "SeverityLevl" NOT NULL,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);
