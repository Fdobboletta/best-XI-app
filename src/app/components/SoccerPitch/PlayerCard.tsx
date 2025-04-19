"use client";

import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Player } from "@/types";
import { PlayerTooltip } from "./PlayerTooltip";
import { useState } from "react";

interface PlayerCardProps {
  player: Player;
}

const getScoreColor = (score: number | null) => {
  if (!score) return "bg-gray-500";
  if (score >= 9.0) return "bg-blue-500";
  if (score >= 8.5) return "bg-cyan-500";
  if (score >= 8.0) return "bg-teal-500";
  if (score >= 7.5) return "bg-green-500";
  return "bg-yellow-500";
};

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip.Trigger asChild>
          <button
            className="flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg p-1 touch-manipulation"
            aria-label={`Ver detalles de ${player.name}`}
          >
            <div
              className={`${getScoreColor(
                player.score
              )} text-white text-sm font-bold px-2 py-0.5 rounded mb-2`}
            >
              {player.score != null ? player.score.toFixed(1) : "-"}
            </div>

            <div className="relative">
              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-black/40 border border-white/10">
                {player.image ? (
                  <Image
                    src={player.image}
                    alt={player.name || ""}
                    fill
                    sizes="(max-width: 48px) 100vw, 48px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    {player.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                <span className="text-[8px] text-white/80 font-medium">
                  {(player.clubName || "???").slice(0, 3).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mt-2 text-center">
              <p className="text-white text-xs font-medium whitespace-nowrap">
                {(player.name || "").split(" ").pop() || "???"}
              </p>
            </div>
          </button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 animate-fadeIn touch-none select-none data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut min-[745px]:w-auto w-[calc(100vw-32px)] fixed min-[745px]:relative left-4 right-4 min-[745px]:left-auto min-[745px]:right-auto"
            sideOffset={5}
            collisionPadding={20}
            onPointerDownOutside={(e) => {
              // Only prevent default on mobile
              if (window.innerWidth < 745) {
                e.preventDefault();
              }
            }}
          >
            <PlayerTooltip player={player} onClose={() => setIsOpen(false)} />
            <Tooltip.Arrow className="fill-gray-900/95 hidden min-[745px]:block" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
