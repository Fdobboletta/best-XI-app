import { Player } from "@/types";
import { PlayerCard, EmptyPlayerCard } from "./SoccerPitch/index";

interface SoccerPitchProps {
  players: Player[];
}

const POSITIONS = {
  // Goalkeeper
  GK: { gridArea: "4/1/5/2" }, // Goalkeeper centered

  // Defenders - Wide spacing and symmetrical to center line (row 4)
  LB: { gridArea: "1/2/2/3" }, // Left Back (3 rows above center)
  CB1: { gridArea: "3/2/4/3" }, // First Center Back (1 row above center)
  CB2: { gridArea: "5/2/6/3" }, // Second Center Back (1 row below center)
  RB: { gridArea: "7/2/8/3" }, // Right Back (3 rows below center)

  // Midfielders - Spread out vertically
  DM: { gridArea: "2/4/3/5" }, // Defensive Mid
  CM: { gridArea: "4/4/5/5" }, // Center Mid
  AM: { gridArea: "6/4/7/5" }, // Attacking Mid

  // Forwards
  LW: { gridArea: "2/6/3/7" }, // Left Wing
  FW: { gridArea: "4/6/5/7" }, // Forward
  RW: { gridArea: "6/6/7/7" }, // Right Wing
} as const;

export function SoccerPitch({ players }: SoccerPitchProps) {
  const playersByPosition = new Map();

  players.forEach((player) => {
    if (player.position !== "CB") {
      playersByPosition.set(player.position, player);
    }
  });

  const centerBacks = players.filter((p) => p.position === "CB");
  if (centerBacks.length > 0) {
    playersByPosition.set("CB1", centerBacks[0]);
    if (centerBacks.length > 1) {
      playersByPosition.set("CB2", centerBacks[1]);
    }
  }

  const getPositionKey = (position: string) => {
    if (position === "CB1" || position === "CB2") {
      return position;
    }
    return position;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-[#1a1a1a] rounded-xl overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: "133.33%" }}>
        {/* SVG Field Markings */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 133.33"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Field Outline */}
          <rect
            x="2"
            y="2"
            width="96"
            height="129.33"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />

          {/* Center Line */}
          <line
            x1="50"
            y1="2"
            x2="50"
            y2="131.33"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />

          {/* Center Circle */}
          <circle
            cx="50"
            cy="66.665"
            r="10"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <circle cx="50" cy="66.665" r="0.5" fill="rgba(255,255,255,0.15)" />

          {/* Penalty Areas */}
          <rect
            x="2"
            y="41.665"
            width="20"
            height="50"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <rect
            x="78"
            y="41.665"
            width="20"
            height="50"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />

          {/* Goal Areas */}
          <rect
            x="2"
            y="54.165"
            width="10"
            height="25"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <rect
            x="88"
            y="54.165"
            width="10"
            height="25"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
        </svg>

        {/* Players Grid */}
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-8 gap-y-2 p-4 sm:p-6 h-full">
          {Object.entries(POSITIONS).map(([position, style]) => {
            const positionKey = getPositionKey(position);
            const player = playersByPosition.get(positionKey);
            const normalizedPosition =
              position === "CB1" || position === "CB2" ? "CB" : position;

            return (
              <div
                key={position}
                className="flex items-center justify-center transform scale-90 sm:scale-100"
                style={{
                  gridArea: style.gridArea,
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
