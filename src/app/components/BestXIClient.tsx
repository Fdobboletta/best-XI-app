"use client";

import { useState } from "react";
import { Player } from "@/types";
import { SoccerPitch } from "./SoccerPitch/SoccerPitch";
import { DetailPanel } from "./DetailPanel";
import { FilterBar } from "./FilterBar";
import { TOTAL_WEEKS } from "@/app/lib/utils";

interface BestXIClientProps {
  players: Player[];
  currentWeek: number;
}

export function BestXIClient({ players, currentWeek }: BestXIClientProps) {
  const [focused, setFocused] = useState<string | null>(null);
  const focusedPlayer = players.find((p) => p.name === focused) ?? null;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10">
      <FilterBar currentWeek={currentWeek} totalWeeks={TOTAL_WEEKS} />

      {/* Stage */}
      <div className="py-4">
        {/* Desktop: 2 cols. Tablet/mobile: 1 col */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0">
          {/* Pitch */}
          <div className="lg:pr-0">
            <SoccerPitch
              players={players}
              focused={focused}
              onFocus={setFocused}
            />
          </div>

          {/* Detail panel — desktop: aside. Mobile: bottom drawer */}
          <div
            className="hidden lg:block"
            style={{
              border: "1px solid var(--border)",
              borderLeft: "none",
              borderRadius: "0 var(--radius-xl) var(--radius-xl) 0",
              overflow: "hidden",
            }}
          >
            <DetailPanel
              player={focusedPlayer}
              onClose={() => setFocused(null)}
            />
          </div>
        </div>

        {/* Mobile bottom drawer */}
        {focused && (
          <div
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
            style={{
              background: "var(--bg-2)",
              borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
              border: "1px solid var(--border)",
              borderBottom: "none",
              maxHeight: "60vh",
              overflowY: "auto",
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  background: "var(--border-2)",
                }}
              />
            </div>
            <DetailPanel
              player={focusedPlayer}
              onClose={() => setFocused(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
