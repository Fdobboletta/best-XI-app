import { db } from "@/app/db";
import { players, playerImages, playerStats } from "@/app/db/schema";
import { eq, desc, and, inArray } from "drizzle-orm";
import {
  buildTeamFromPlayers,
  getAgeCondition,
  getMarketValueCondition,
  POSITIONS,
} from "../utils";
import { FilterParams } from "../types";

interface Player {
  id: number;
  name: string;
  position: string;
  clubName: string | null;
  score: number | null;
  image: string | null;
  marketValue: number | null;
  contractEndDate: string | null;
  dateOfBirth: string | null;
}

export const fetchPlayers = async ({
  week,
  age,
  value,
}: FilterParams): Promise<Player[]> => {
  const currentWeek = parseInt(week || "1");

  const relevantPositions = POSITIONS.filter((pos) => pos !== "GK");

  const conditions = [
    inArray(playerStats.mainPosition, relevantPositions),
    eq(playerStats.week, currentWeek),
  ];

  const ageCondition = getAgeCondition(age || "");
  if (ageCondition) conditions.push(ageCondition);

  const valueCondition = getMarketValueCondition(value || "");
  if (valueCondition) conditions.push(valueCondition);

  const allPlayers = await db
    .select({
      id: players.id,
      name: players.name,
      position: playerStats.mainPosition,
      clubName: players.clubName,
      score: playerStats.score,
      image: playerImages.imageUrl,
      imageId: playerImages.id,
      dateOfBirth: players.dateOfBirth,
      marketValue: players.marketValue,
      contractEndDate: players.contractEnd,
      transfermarktPlayerId: players.transfermarktPlayerId,
    })
    .from(players)
    .leftJoin(
      playerImages,
      eq(players.transfermarktPlayerId, playerImages.transfermarktPlayerId)
    )
    .leftJoin(
      playerStats,
      eq(players.transfermarktPlayerId, playerStats.playerIdReference)
    )
    .where(and(...conditions))
    .orderBy(desc(playerStats.score));

  return buildTeamFromPlayers(allPlayers, relevantPositions);
};
