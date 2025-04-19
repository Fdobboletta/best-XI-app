import { Player } from "@/types";
import { PlayerCard } from "./PlayerCard";
import { EmptyPlayerCard } from "./EmptyPlayerCard";

interface SoccerPitchProps {
  players: Player[];
}

const POSITIONS = {
  // Goalkeeper (Column 0)
  GK: { gridArea: "4/1/5/2" },

  // Defenders (Column 2)
  RB: { gridArea: "7/2/8/3" },
  CB1: { gridArea: "3/2/4/3" },
  CB2: { gridArea: "5/2/6/3" },
  LB: { gridArea: "1/2/2/3" },

  // Midfielders (Column 4)
  CM: { gridArea: "2/4/3/5" },
  DM: { gridArea: "4/4/5/5" },
  AM: { gridArea: "6/4/7/5" },

  // Forwards (Column 6)
  RW: { gridArea: "6/6/7/7" },
  FW: { gridArea: "4/6/5/7" },
  LW: { gridArea: "2/6/3/7" },
} as const;

export function SoccerPitch({ players }: SoccerPitchProps) {
  const playersByPosition = new Map();

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

  const getPositionKey = (position: string) => {
    if (position === "CB1" || position === "CB2") {
      return position;
    }
    return position;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-[#1a1a1a] rounded-xl overflow-hidden">
      <div className="relative w-full min-[745px]:pb-[66.67%] pb-[133.33%]">
        {/* Desktop Field */}
        <svg
          className="absolute inset-0 w-full h-full hidden min-[745px]:block"
          viewBox="0 0 100 66.67"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="96"
            height="62.67"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <line
            x1="50"
            y1="2"
            x2="50"
            y2="64.67"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <circle
            cx="50"
            cy="33.335"
            r="8"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <circle cx="50" cy="33.335" r="0.5" fill="rgba(255,255,255,0.15)" />
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

        {/* Mobile Field */}
        <svg
          className="absolute inset-0 w-full h-full min-[745px]:hidden"
          viewBox="0 0 100 133.33"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="96"
            height="129.33"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <line
            x1="50"
            y1="2"
            x2="50"
            y2="131.33"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <circle
            cx="50"
            cy="66.665"
            r="10"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.2"
          />
          <circle cx="50" cy="66.665" r="0.5" fill="rgba(255,255,255,0.15)" />
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
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-7 gap-1 min-[745px]:gap-0 p-3 min-[745px]:p-8 h-full">
          {Object.entries(POSITIONS).map(([position, style]) => {
            const positionKey = getPositionKey(position);
            const player = playersByPosition.get(positionKey);
            const normalizedPosition =
              position === "CB1" || position === "CB2" ? "CB" : position;

            return (
              <div
                key={position}
                className="flex items-center justify-center transform scale-[0.85] min-[745px]:scale-100"
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
