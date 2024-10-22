-- CreateEnum
CREATE TYPE "StockMovmentType" AS ENUM ('ENTRY', 'EXIT');

-- CreateTable
CREATE TABLE "StockMovmentHistory" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "type" "StockMovmentType" NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockMovmentHistory_pkey" PRIMARY KEY ("id")
);
