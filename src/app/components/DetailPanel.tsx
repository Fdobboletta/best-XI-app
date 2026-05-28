// src/app/components/DetailPanel.tsx
"use client";

import { Player } from "@/types";
import { scoreTier, TIER_STYLES } from "@/app/lib/scoreTier";
import { getClubColor } from "@/app/lib/clubColors";
import { fmtMoney, fmtDate, getAge } from "@/app/lib/formatters";
import { Avatar } from "./Avatar";

interface DetailPanelProps {
  player: Player | null;
  onClose: () => void;
}

function StatCell({
  label,
  value,
  accent,
  span,
}: {
  label: string;
  value: string;
  accent?: boolean;
  span?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--bg-2)",
        padding: "12px 16px",
        gridColumn: span ? "1 / -1" : undefined,
      }}
    >
      <div
        style={{
          color: "var(--text-faint)",
          fontSize: 9,
          letterSpacing: "0.1em",
          fontFamily: "var(--font-num)",
          marginBottom: 4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: accent ? "var(--accent)" : "var(--text)",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 px-6 py-12 text-center">
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "var(--accent)",
          opacity: 0.25,
          lineHeight: 1,
          fontFamily: "var(--font-display)",
        }}
      >
        11
      </div>
      <div style={{ color: "var(--text)", fontSize: 14, fontWeight: 600 }}>
        Tocá un jugador
      </div>
      <div
        style={{
          color: "var(--text-faint)",
          fontSize: 12,
          lineHeight: 1.6,
          maxWidth: 200,
        }}
      >
        Acá vas a ver su valor de mercado y estadísticas
      </div>
    </div>
  );
}

function PlayerDetail({
  player,
  onClose,
}: {
  player: Player;
  onClose: () => void;
}) {
  const tier = scoreTier(player.score);
  const tierStyle = TIER_STYLES[tier];
  const clubColor = getClubColor(player.clubName);
  const posName = player.position ?? "—";

  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <div className="relative p-6" style={{ paddingBottom: 16 }}>
        <button
          onClick={onClose}
          aria-label="Cerrar panel"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 28,
            height: 28,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-s)",
            color: "var(--text-dim)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ✕
        </button>
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-start gap-2">
            <div
              style={{
                background: tierStyle.bg,
                color: tierStyle.text,
                padding: "3px 8px 4px",
                borderRadius: "var(--radius-s)",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "var(--font-num)",
                boxShadow: tierStyle.glow,
              }}
            >
              {player.score != null ? player.score.toFixed(1) : "—"}
            </div>
          </div>
          <Avatar
            name={player.name}
            imageUrl={player.image}
            clubColor={clubColor}
            size={72}
            focused
          />
          <div>
            <div
              style={{
                color: "var(--text-faint)",
                fontSize: 10,
                letterSpacing: "0.1em",
                fontFamily: "var(--font-num)",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {posName}
            </div>
            <h2
              style={{
                color: "var(--text)",
                fontSize: 17,
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {player.name}
            </h2>
            <div
              style={{ color: "var(--text-faint)", fontSize: 11, marginTop: 2 }}
            >
              {player.clubName ?? "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          background: "var(--border)",
          flex: 1,
        }}
      >
        <StatCell label="Posición" value={posName} />
        <StatCell label="Edad" value={getAge(player.dateOfBirth)?.toString() ?? "—"} />
        <StatCell
          label="Valor de mercado"
          value={fmtMoney(player.marketValue)}
          accent
          span
        />
        <StatCell label="Fin de contrato" value={fmtDate(player.contractEndDate)} />
        <StatCell label="Nacimiento" value={fmtDate(player.dateOfBirth)} />
      </div>

      {/* CTA — placeholder, comparison feature not yet implemented */}
      <div className="p-4">
        <button
          disabled
          style={{
            width: "100%",
            background: "transparent",
            color: "var(--text-faint)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-m)",
            padding: "10px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "not-allowed",
            fontFamily: "var(--font-body)",
          }}
        >
          Comparar
        </button>
      </div>
    </div>
  );
}

export function DetailPanel({ player, onClose }: DetailPanelProps) {
  return (
    <div
      style={{
        background: "var(--bg-2)",
        borderLeft: "1px solid var(--border)",
        height: "100%",
      }}
    >
      {player ? (
        <PlayerDetail player={player} onClose={onClose} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
