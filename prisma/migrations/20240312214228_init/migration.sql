-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DELETED');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "fullname" VARCHAR(200) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Giveaway" (
    "giveawayId" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "giveawayDate" TIMESTAMP(3) NOT NULL,
    "participantsLimit" INTEGER NOT NULL,
    "prize" VARCHAR(255) NOT NULL,
    "winnerParticipantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Giveaway_pkey" PRIMARY KEY ("giveawayId")
);

-- CreateTable
CREATE TABLE "Participant" (
    "participantId" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "fullname" VARCHAR(200) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "giveawayId" INTEGER NOT NULL,
    "createdIt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participantId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Giveaway_winnerParticipantId_key" ON "Giveaway"("winnerParticipantId");

-- AddForeignKey
ALTER TABLE "Giveaway" ADD CONSTRAINT "Giveaway_winnerParticipantId_fkey" FOREIGN KEY ("winnerParticipantId") REFERENCES "Participant"("participantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_giveawayId_fkey" FOREIGN KEY ("giveawayId") REFERENCES "Giveaway"("giveawayId") ON DELETE RESTRICT ON UPDATE CASCADE;
