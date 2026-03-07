-- CreateEnum
CREATE TYPE "ProductOptionType" AS ENUM ('COLOR', 'SIZE', 'MATERIAL', 'VOLUME', 'WEIGHT', 'LENGTH', 'WIDTH', 'HEIGHT', 'OTHER');

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "type" "ProductOptionType" NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "options_type_key" ON "options"("type");
