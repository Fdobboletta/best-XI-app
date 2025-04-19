import Image from "next/image";
import { Player } from "@/types";

interface PlayerTooltipProps {
  player: Player;
}

const formatDate = (date: string | null) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatMarketValue = (value: number | null) => {
  if (!value) return "N/A";
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

const getPositionName = (position: string | null): string => {
  if (!position) return "N/A";
  const positions: Record<string, string> = {
    GK: "Arquero",
    LB: "Lateral Izquierdo",
    RB: "Lateral Derecho",
    CB: "Defensor Central",
    DM: "Centrocampista Defensivo",
    CM: "Centrocampista",
    AM: "Centrocampista Ofensivo",
    LW: "Extremo Izquierdo",
    FW: "Delantero Centro",
    RW: "Extremo Derecho",
  };
  return positions[position] || position;
};

export const PlayerTooltip = ({ player }: PlayerTooltipProps) => (
  <div className="bg-gray-900/95 p-4 rounded-lg shadow-xl max-w-xs">
    <div className="space-y-3">
      <div className="flex items-center space-x-3 border-b border-white/10 pb-2">
        <div className="w-12 h-12 relative rounded-full overflow-hidden">
          {player.image ? (
            <Image
              src={player.image}
              alt={player.name || ""}
              fill
              sizes="(max-width: 48px) 100vw, 48px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              {player.name?.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-white font-medium">{player.name}</h3>
          <p className="text-white/60 text-sm">{player.clubName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-white/60">Posición</p>
          <p className="text-white font-medium">
            {getPositionName(player.position)}
          </p>
        </div>
        <div>
          <p className="text-white/60">Puntuación</p>
          <p className="text-white font-medium">
            {player.score?.toFixed(1) || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-white/60">Valor de mercado</p>
          <p className="text-white font-medium">
            {formatMarketValue(player.marketValue)}
          </p>
        </div>
        <div>
          <p className="text-white/60">Fin de contrato</p>
          <p className="text-white font-medium">
            {formatDate(player.contractEndDate)}
          </p>
        </div>
        <div>
          <p className="text-white/60">Fecha de nacimiento</p>
          <p className="text-white font-medium">
            {formatDate(player.dateOfBirth)}
          </p>
        </div>
      </div>
    </div>
  </div>
);
