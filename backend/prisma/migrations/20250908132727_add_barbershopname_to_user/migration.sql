/*
  Warnings:

  - You are about to drop the column `monthlyValue` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Billing" ADD COLUMN     "description" TEXT,
ADD COLUMN     "paymentUrl" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Client" DROP COLUMN "monthlyValue",
DROP COLUMN "plan",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "public"."Client"("email");
