import { eq, desc, and } from "drizzle-orm";
import { players, playerImages, goalkeeperStats } from "@/app/db/schema";
import { Player } from "@/types";
import { FilterParams } from "../types";
import { getAgeCondition, getMarketValueCondition } from "../utils";
import { db } from "@/app/db";

export const fetchKeeper = async ({
  week,
  age,
  value,
}: FilterParams): Promise<Player> => {
  const currentWeek = parseInt(week || "1");

  const conditions = [eq(goalkeeperStats.week, currentWeek)];

  const ageCondition = getAgeCondition(age || "");
  if (ageCondition) conditions.push(ageCondition);

  const valueCondition = getMarketValueCondition(value || "");
  if (valueCondition) conditions.push(valueCondition);

  const allKeepers = await db
    .select({
      id: players.id,
      name: players.name,
      clubName: players.clubName,
      score: goalkeeperStats.score,
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
      goalkeeperStats,
      eq(players.transfermarktPlayerId, goalkeeperStats.playerIdReference)
    )
    .where(and(...conditions))
    .orderBy(desc(goalkeeperStats.score));

  const keeper = { ...allKeepers[0], position: "GK" };

  return keeper;
};
