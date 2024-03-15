-- DropForeignKey
ALTER TABLE "Giveaway" DROP CONSTRAINT "Giveaway_winnerParticipantId_fkey";

-- AlterTable
ALTER TABLE "Giveaway" ALTER COLUMN "winnerParticipantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Giveaway" ADD CONSTRAINT "Giveaway_winnerParticipantId_fkey" FOREIGN KEY ("winnerParticipantId") REFERENCES "Participant"("participantId") ON DELETE SET NULL ON UPDATE CASCADE;
