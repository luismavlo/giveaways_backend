/*
  Warnings:

  - A unique constraint covering the columns `[discordId,giveawayId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participant_discordId_giveawayId_key" ON "Participant"("discordId", "giveawayId");
