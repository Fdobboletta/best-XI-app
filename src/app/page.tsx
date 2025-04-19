import { db } from "@/app/db";
import { players, playerImages, playerStats } from "@/app/db/schema";
import { SoccerPitch } from "@/app/components/SoccerPitch";
import { FilterBar } from "@/app/components/FilterBar";
import { eq, desc, and, lt, gt, between } from "drizzle-orm";
import { Suspense } from "react";

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

const TOTAL_WEEKS = 38; // Total weeks in a season

interface HomeProps {
  searchParams: {
    week?: string;
    age?: string;
    value?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  try {
    const currentWeek = parseInt(searchParams.week || "1");

    // Age filter conditions
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

    // Market value filter conditions
    const getValueCondition = (valueFilter: string) => {
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

    const playersWithImagesAndStats = (
      await Promise.all(
        POSITIONS.filter((position) => position !== "GK").map(
          async (position) => {
            // Build conditions array
            const conditions = [
              eq(playerStats.mainPosition, position),
              eq(playerStats.week, currentWeek),
            ];

            // Add age filter if selected
            const ageCondition = getAgeCondition(searchParams.age || "");
            if (ageCondition) conditions.push(ageCondition);

            // Add value filter if selected
            const valueCondition = getValueCondition(searchParams.value || "");
            if (valueCondition) conditions.push(valueCondition);

            const query = db
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
              })
              .from(players)
              .leftJoin(
                playerImages,
                eq(
                  players.transfermarktPlayerId,
                  playerImages.transfermarktPlayerId
                )
              )
              .leftJoin(
                playerStats,
                eq(players.transfermarktPlayerId, playerStats.playerIdReference)
              )
              .where(and(...conditions))
              .orderBy(desc(playerStats.score));

            let playersResult;

            if (position === "CB") {
              const allCBs = await query;
              playersResult = Array.from(
                new Map(allCBs.map((p) => [p.id, p])).values()
              ).slice(0, 2);
            } else {
              playersResult = await query.limit(1);
            }

            if (position === "CB" && playersResult.length < 2) {
              return null;
            }

            return playersResult.map((player) => ({
              id: player.id,
              name: player.name || "Desconocido",
              position: player.position || "Unknown",
              clubName: player.clubName,
              score: player.score,
              image: player.image,
              marketValue: player.marketValue,
              contractEndDate: player.contractEndDate,
              dateOfBirth: player.dateOfBirth,
            }));
          }
        )
      )
    )
      .flat()
      .filter((p) => p !== null);

    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Header */}
        <header className="bg-[#1a1a1a] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-white">
              Once Ideal de la Semana
            </h1>
            <p className="text-white/60 mt-2">
              Los mejores jugadores según sus estadísticas
            </p>
          </div>
        </header>

        {/* Filters */}
        <Suspense>
          <FilterBar currentWeek={currentWeek} totalWeeks={TOTAL_WEEKS} />
        </Suspense>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {playersWithImagesAndStats.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-xl">
              <div className="text-white text-center py-12">
                <h2 className="text-xl font-bold mb-2">
                  No hay jugadores disponibles
                </h2>
                <p className="text-white/60">
                  No se encontraron jugadores que coincidan con los filtros
                  seleccionados.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-xl">
              <SoccerPitch players={playersWithImagesAndStats} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-[#1a1a1a] border-t border-white/10 mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-white/60 text-sm">
              Datos proporcionados por Transfermarkt
            </p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Error de conexión</h1>
          <p className="text-white/60">
            No se pudo conectar con la base de datos. Por favor, intente
            nuevamente más tarde.
          </p>
        </div>
      </div>
    );
  }
}
