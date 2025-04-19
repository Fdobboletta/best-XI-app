import { players } from "@/app/db/schema";
import { lt, gt, between } from "drizzle-orm";

const TOTAL_WEEKS = 38;

const POSITIONS = [
  "GK",
  "LB",
  "CB",
  "RB",
  "DM",
  "CM",
  "AM",
  "LW",
  "FW",
  "RW",
] as const;

interface PlayerQueryResult {
  id: number;
  name: string;
  position: string | null;
  clubName: string | null;
  score: number | null;
  image: string | null;
  imageId: number | null;
  dateOfBirth: string | null;
  marketValue: number | null;
  contractEndDate: string | null;
  transfermarktPlayerId: number;
}

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

const mapToPlayerInterface = (player: PlayerQueryResult): Player => ({
  id: player.id,
  name: player.name || "Desconocido",
  position: player.position || "Unknown",
  clubName: player.clubName,
  score: player.score,
  image: player.image,
  marketValue: player.marketValue,
  contractEndDate: player.contractEndDate,
  dateOfBirth: player.dateOfBirth,
});

const getAgeCondition = (ageFilter: string) => {
  const now = new Date();
  switch (ageFilter) {
    case "u21":
      return gt(
        players.dateOfBirth,
        new Date(
          now.getFullYear() - 21,
          now.getMonth(),
          now.getDate()
        ).toISOString()
      );
    case "21-25":
      return between(
        players.dateOfBirth,
        new Date(
          now.getFullYear() - 25,
          now.getMonth(),
          now.getDate()
        ).toISOString(),
        new Date(
          now.getFullYear() - 21,
          now.getMonth(),
          now.getDate()
        ).toISOString()
      );
    case "26-30":
      return between(
        players.dateOfBirth,
        new Date(
          now.getFullYear() - 30,
          now.getMonth(),
          now.getDate()
        ).toISOString(),
        new Date(
          now.getFullYear() - 26,
          now.getMonth(),
          now.getDate()
        ).toISOString()
      );
    case "o30":
      return lt(
        players.dateOfBirth,
        new Date(
          now.getFullYear() - 30,
          now.getMonth(),
          now.getDate()
        ).toISOString()
      );
    default:
      return undefined;
  }
};

const getMarketValueCondition = (valueFilter: string) => {
  switch (valueFilter) {
    case "u10":
      return lt(players.marketValue, 10000000);
    case "10-30":
      return between(players.marketValue, 10000000, 30000000);
    case "30-50":
      return between(players.marketValue, 30000000, 50000000);
    case "o50":
      return gt(players.marketValue, 50000000);
    default:
      return undefined;
  }
};

const buildTeamFromPlayers = (
  allPlayers: PlayerQueryResult[],
  relevantPositions: (typeof POSITIONS)[number][]
): Player[] => {
  // Agrupar jugadores por posición
  const playersByPosition = allPlayers.reduce((acc, player) => {
    if (!player.position) return acc;
    if (!acc[player.position]) {
      acc[player.position] = [];
    }
    // Solo agregar jugadores únicos (evitar duplicados por transfermarktPlayerId)
    if (
      !acc[player.position].some(
        (p) => p.transfermarktPlayerId === player.transfermarktPlayerId
      )
    ) {
      acc[player.position].push(player);
    }
    return acc;
  }, {} as Record<string, typeof allPlayers>);

  // Construir el equipo final
  const finalTeam: Player[] = [];

  for (const position of relevantPositions) {
    const positionPlayers = playersByPosition[position] || [];

    // Para CB, tomar los 2 mejores jugadores
    if (position === "CB") {
      const topCBs = positionPlayers.slice(0, 2);
      if (topCBs.length === 2) {
        finalTeam.push(...topCBs.map(mapToPlayerInterface));
      }
    }
    // Para las demás posiciones, tomar el mejor jugador
    else {
      const topPlayer = positionPlayers[0];
      if (topPlayer) {
        finalTeam.push(mapToPlayerInterface(topPlayer));
      }
    }
  }

  return finalTeam;
};

export {
  getAgeCondition,
  getMarketValueCondition,
  buildTeamFromPlayers,
  POSITIONS,
  TOTAL_WEEKS,
};
