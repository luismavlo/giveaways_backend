/*
  Warnings:

  - You are about to drop the column `prize` on the `Giveaway` table. All the data in the column will be lost.
  - You are about to drop the column `winnerParticipantId` on the `Giveaway` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Giveaway" DROP CONSTRAINT "Giveaway_winnerParticipantId_fkey";

-- DropIndex
DROP INDEX "Giveaway_winnerParticipantId_key";

-- AlterTable
ALTER TABLE "Giveaway" DROP COLUMN "prize",
DROP COLUMN "winnerParticipantId",
ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "Prize" (
    "prizeId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" TEXT,
    "winnerId" INTEGER,
    "giveawayId" INTEGER NOT NULL,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("prizeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prize_winnerId_key" ON "Prize"("winnerId");

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Participant"("participantId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_giveawayId_fkey" FOREIGN KEY ("giveawayId") REFERENCES "Giveaway"("giveawayId") ON DELETE RESTRICT ON UPDATE CASCADE;
