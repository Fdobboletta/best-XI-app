import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Player } from "@/types";
import { PlayerTooltip } from "./PlayerTooltip";

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

export const PlayerCard = ({ player }: PlayerCardProps) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
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
