// src/app/components/SoccerPitch/SoccerPitch.tsx
import { Player } from "@/types";
import { ChipPill } from "@/app/components/ChipPill";

interface SlotPos {
  x: number;
  y: number;
}

const SLOT_POSITIONS: Record<string, SlotPos> = {
  GK:  { x: 6,  y: 50 },
  LB:  { x: 25, y: 18 },
  CB1: { x: 25, y: 38 },
  CB2: { x: 25, y: 62 },
  RB:  { x: 25, y: 82 },
  CM:  { x: 48, y: 28 },
  DM:  { x: 48, y: 50 },
  AM:  { x: 48, y: 72 },
  LW:  { x: 72, y: 20 },
  FW:  { x: 72, y: 50 },
  RW:  { x: 72, y: 80 },
};

interface SoccerPitchProps {
  players: Player[];
  focused: string | null;
  onFocus: (name: string | null) => void;
}

export function SoccerPitch({ players, focused, onFocus }: SoccerPitchProps) {
  const slotted = new Map<string, Player>();

  players.forEach((player) => {
    if (player.position !== "CB") {
      slotted.set(player.position ?? "", player);
    }
  });

  const cbs = players.filter((p) => p.position === "CB");
  if (cbs[0]) slotted.set("CB1", cbs[0]);
  if (cbs[1]) slotted.set("CB2", cbs[1]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "100/66",
        borderRadius: "var(--radius-xl)",
        background: "linear-gradient(180deg, #163C2A 0%, #0F2B1F 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 -8px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Grass stripes */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0, transparent calc(100%/12 - 1px), rgba(255,255,255,0.04) calc(100%/12 - 1px), rgba(255,255,255,0.04) calc(100%/12))",
        }}
      />

      {/* Field SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 66"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect
          x="1" y="1" width="98" height="64" rx="1"
          stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none"
        />
        <line
          x1="50" y1="1" x2="50" y2="65"
          stroke="rgba(255,255,255,0.55)" strokeWidth="0.4"
        />
        <circle
          cx="50" cy="33" r="9"
          stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none"
        />
        <circle cx="50" cy="33" r="0.6" fill="rgba(255,255,255,0.55)" />
        {/* Left penalty box */}
        <rect
          x="1" y="20" width="14" height="26"
          stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none"
        />
        {/* Right penalty box */}
        <rect
          x="85" y="20" width="14" height="26"
          stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none"
        />
        {/* Left goal area */}
        <rect
          x="1" y="27" width="5.5" height="12"
          stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none"
        />
        {/* Right goal area */}
        <rect
          x="93.5" y="27" width="5.5" height="12"
          stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none"
        />
        {/* Corner arcs */}
        <path d="M1,3 A1.6,1.6,0,0,0,2.6,1" stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none" />
        <path d="M99,3 A1.6,1.6,0,0,1,97.4,1" stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none" />
        <path d="M1,63 A1.6,1.6,0,0,1,2.6,65" stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none" />
        <path d="M99,63 A1.6,1.6,0,0,0,97.4,65" stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" fill="none" />
      </svg>

      {/* Player chips */}
      {Object.entries(SLOT_POSITIONS).map(([slot, pos]) => {
        const player = slotted.get(slot);
        if (!player) return null;
        return (
          <div
            key={slot}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: player.name === focused ? 10 : 1,
            }}
          >
            <ChipPill
              player={player}
              focused={player.name === focused}
              onFocus={onFocus}
            />
          </div>
        );
      })}
    </div>
  );
}
