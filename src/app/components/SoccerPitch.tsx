import Image from "next/image";
import { Player } from "@/types";
import * as Tooltip from "@radix-ui/react-tooltip";

interface SoccerPitchProps {
  players: Player[];
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

const PlayerTooltip = ({ player }: { player: Player }) => (
  <div className="bg-gray-900/95 p-4 rounded-lg shadow-xl max-w-xs">
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-white/10 pb-2">
        <div className="w-12 h-12 relative rounded-full overflow-hidden">
          {player.image ? (
            <Image
              src={player.image}
              alt={player.name || ""}
              fill
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

      {/* Stats Grid */}
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

      {/* Performance Stats */}
      {player.stats && (
        <div className="border-t border-white/10 pt-2">
          <h4 className="text-white/60 text-sm mb-2">Estadísticas</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-white/60">Goles</p>
              <p className="text-white font-medium">
                {player.stats.goals || 0}
              </p>
            </div>
            <div>
              <p className="text-white/60">Asist.</p>
              <p className="text-white font-medium">
                {player.stats.assists || 0}
              </p>
            </div>
            <div>
              <p className="text-white/60">Min.</p>
              <p className="text-white font-medium">
                {player.stats.minutes || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

const getScoreColor = (score: number | null) => {
  if (!score) return "bg-gray-500";
  if (score >= 9.0) return "bg-blue-500";
  if (score >= 8.5) return "bg-cyan-500";
  if (score >= 8.0) return "bg-teal-500";
  if (score >= 7.5) return "bg-green-500";
  return "bg-yellow-500";
};

const EmptyPlayerCard = ({ position }: { position: string }) => (
  <div className="flex flex-col items-center opacity-40">
    {/* Score Badge */}
    <div className="bg-gray-500 text-white text-sm font-bold px-2 py-0.5 rounded mb-2">
      -
    </div>

    {/* Player Image */}
    <div className="relative">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-black/40 border border-white/10">
        <div className="w-full h-full flex items-center justify-center text-white/50">
          ?
        </div>
      </div>
      {/* Position indicator */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
        <span className="text-[8px] text-white/80 font-medium">{position}</span>
      </div>
    </div>

    {/* Position Name */}
    <div className="mt-2 text-center">
      <p className="text-white/50 text-xs font-medium whitespace-nowrap">
        Sin jugador
      </p>
    </div>
  </div>
);

const PlayerCard = ({ player }: { player: Player }) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          {/* Score Badge */}
          <div
            className={`${getScoreColor(
              player.score
            )} text-white text-sm font-bold px-2 py-0.5 rounded mb-2`}
          >
            {player.score != null ? player.score.toFixed(1) : "-"}
          </div>

          {/* Player Image */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-black/40 border border-white/10">
              {player.image ? (
                <Image
                  src={player.image}
                  alt={player.name || ""}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/50">
                  {player.name?.charAt(0) || "?"}
                </div>
              )}
            </div>
            {/* Club Logo */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
              <span className="text-[8px] text-white/80 font-medium">
                {(player.clubName || "???").slice(0, 3).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Player Name */}
          <div className="mt-2 text-center">
            <p className="text-white text-xs font-medium whitespace-nowrap">
              {(player.name || "").split(" ").pop() || "???"}
            </p>
          </div>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="z-50 animate-fadeIn"
          sideOffset={5}
          collisionPadding={20}
        >
          <PlayerTooltip player={player} />
          <Tooltip.Arrow className="fill-gray-900/95" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const POSITIONS = {
  // Defenders (Column 2)
  RB: { gridArea: "7/2/8/3" }, // Right Back
  CB1: { gridArea: "3/2/4/3" }, // First Center Back
  CB2: { gridArea: "5/2/6/3" }, // Second Center Back
  LB: { gridArea: "1/2/2/3" }, // Left Back

  // Midfielders (Column 4)
  CM: { gridArea: "2/4/3/5" }, // Center Mid
  DM: { gridArea: "4/4/5/5" }, // Defensive Mid
  AM: { gridArea: "6/4/7/5" }, // Attacking Mid

  // Forwards (Column 6)
  RW: { gridArea: "6/6/7/7" }, // Right Wing
  FW: { gridArea: "4/6/5/7" }, // Forward
  LW: { gridArea: "2/6/3/7" }, // Left Wing

  // Goalkeeper (Column 0, between Mengi and Richards)
  GK: { gridArea: "4/1/5/2" },
} as const;

export function SoccerPitch({ players }: SoccerPitchProps) {
  // Create a map of position to player for easy lookup
  const playersByPosition = new Map();

  // First, handle all non-CB positions
  players.forEach((player) => {
    if (player.position !== "CB") {
      playersByPosition.set(player.position, player);
    }
  });

  // Then handle CBs separately
  const centerBacks = players.filter((p) => p.position === "CB");
  if (centerBacks.length > 0) {
    playersByPosition.set("CB1", centerBacks[0]);
    if (centerBacks.length > 1) {
      playersByPosition.set("CB2", centerBacks[1]);
    }
  }

  // Function to get the correct position key for lookup
  const getPositionKey = (position: string) => {
    if (position === "CB1" || position === "CB2") {
      return position;
    }
    return position;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-[#1a1a1a] rounded-xl overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
        {/* SVG Field Markings */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 66.67"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Field Outline */}
          <rect
            x="2"
            y="2"
            width="96"
            height="62.67"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />

          {/* Center Line */}
          <line
            x1="50"
            y1="2"
            x2="50"
            y2="64.67"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />

          {/* Center Circle */}
          <circle
            cx="50"
            cy="33.335"
            r="8"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <circle cx="50" cy="33.335" r="0.5" fill="rgba(255,255,255,0.15)" />

          {/* Penalty Areas */}
          <rect
            x="2"
            y="16.67"
            width="16"
            height="33.33"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <rect
            x="82"
            y="16.67"
            width="16"
            height="33.33"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />

          {/* Goal Areas */}
          <rect
            x="2"
            y="25"
            width="8"
            height="16.67"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <rect
            x="90"
            y="25"
            width="8"
            height="16.67"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
        </svg>

        {/* Players Grid */}
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-7 p-8 h-full">
          {Object.entries(POSITIONS).map(([position, style]) => {
            const positionKey = getPositionKey(position);
            const player = playersByPosition.get(positionKey);
            const normalizedPosition =
              position === "CB1" || position === "CB2" ? "CB" : position;

            return (
              <div
                key={position}
                className="flex items-center justify-center"
                style={{
                  gridArea: style.gridArea,
                  alignSelf: "center",
                }}
              >
                {player ? (
                  <PlayerCard player={player} />
                ) : (
                  <EmptyPlayerCard position={normalizedPosition} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
