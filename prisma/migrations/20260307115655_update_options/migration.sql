/*
  Warnings:

  - The values [OTHER] on the enum `ProductOptionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductOptionType_new" AS ENUM ('COLOR', 'SIZE', 'MATERIAL', 'VOLUME', 'WEIGHT', 'LENGTH', 'WIDTH', 'HEIGHT');
ALTER TABLE "options" ALTER COLUMN "type" TYPE "ProductOptionType_new" USING ("type"::text::"ProductOptionType_new");
ALTER TYPE "ProductOptionType" RENAME TO "ProductOptionType_old";
ALTER TYPE "ProductOptionType_new" RENAME TO "ProductOptionType";
DROP TYPE "public"."ProductOptionType_old";
COMMIT;
