/*
  Warnings:

  - You are about to drop the column `numRevies` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "numRevies",
ADD COLUMN     "numReviews" INTEGER NOT NULL DEFAULT 0;
