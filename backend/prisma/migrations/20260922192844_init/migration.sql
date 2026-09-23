-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "score" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "opponentId" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "handedness" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_opponentId_fkey" FOREIGN KEY ("opponentId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
