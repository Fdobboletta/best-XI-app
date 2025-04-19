import { FilterBar } from "@/app/components/FilterBar";
import { Suspense } from "react";
import { SoccerPitch } from "./components/SoccerPitch";
import { TOTAL_WEEKS } from "./lib/utils";
import { fetchKeeper } from "./lib/fetchKeepers/fetchKeepers";
import { fetchPlayers } from "./lib/fetchPlayers/fetchPlayers";

interface HomeProps {
  searchParams: {
    week?: string;
    age?: string;
    value?: string;
  };
}

export default async function Home(props: HomeProps) {
  try {
    const searchParams = await props.searchParams;
    const currentWeek = parseInt(searchParams.week || "1");
    const playersWithImagesAndStats = await fetchPlayers(searchParams);
    const keepersWithImagesAndStats = await fetchKeeper(searchParams);

    const bestXI = [...playersWithImagesAndStats, keepersWithImagesAndStats];

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
              <SoccerPitch players={bestXI} />
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
