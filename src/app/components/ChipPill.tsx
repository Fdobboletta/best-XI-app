"use client";

import { Player } from "@/types";
import { scoreTier, TIER_STYLES } from "@/app/lib/scoreTier";
import { getClubColor } from "@/app/lib/clubColors";
import { Avatar } from "./Avatar";

interface ChipPillProps {
  player: Player;
  focused: boolean;
  onFocus: (name: string | null) => void;
}

export function ChipPill({ player, focused, onFocus }: ChipPillProps) {
  const tier = scoreTier(player.score);
  const tierStyle = TIER_STYLES[tier];
  const clubColor = getClubColor(player.clubName);
  const lastName = (player.name || "").split(" ").pop() || player.name;
  const clubAbbr = (player.clubName || "???").slice(0, 3).toUpperCase();

  const handleClick = () => {
    onFocus(focused ? null : player.name);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`${player.name}, ${player.position}, score ${player.score}`}
      aria-pressed={focused}
      className="flex flex-col items-center gap-[2px] cursor-pointer bg-transparent border-none p-0 group"
      style={{
        transform: focused ? "translateY(-2px)" : undefined,
        transition: "transform 160ms cubic-bezier(.2,0,0,1)",
      }}
    >
      {/* Score badge */}
      <div
        style={{
          background: tierStyle.bg,
          color: tierStyle.text,
          boxShadow: focused ? tierStyle.glow : undefined,
          padding: "3px 8px 4px",
          borderRadius: "var(--radius-s)",
          fontSize: 10,
          fontWeight: 700,
          lineHeight: 1.2,
          fontFamily: "var(--font-num)",
          whiteSpace: "nowrap",
        }}
      >
        {player.score != null ? player.score.toFixed(1) : "—"}{" "}
        {player.position || ""}
      </div>

      {/* Avatar + club chip */}
      <div className="relative">
        <Avatar
          name={player.name}
          imageUrl={player.image}
          clubColor={clubColor}
          size={52}
          focused={focused}
        />
        {/* Club chip */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            background: clubColor.hex,
            borderRadius: 4,
            padding: "2px 4px",
            fontSize: 7,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1,
            fontFamily: "var(--font-num)",
          }}
        >
          {clubAbbr}
        </div>
      </div>

      {/* Name strip */}
      <div
        style={{
          padding: "2px 8px",
          borderRadius: "var(--radius-s)",
          background: "rgba(10,12,18,0.7)",
          backdropFilter: "blur(6px)",
          fontSize: 10,
          color: "var(--text)",
          whiteSpace: "nowrap",
        }}
      >
        {lastName}
      </div>
    </button>
  );
}
