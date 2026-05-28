// src/app/components/FilterBar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FilterBarProps {
  currentWeek: number;
  totalWeeks: number;
}

const AGE_OPTIONS = [
  { label: "Todas", value: "" },
  { label: "Sub-21", value: "u21" },
  { label: "21–25", value: "21-25" },
  { label: "26–30", value: "26-30" },
  { label: "+30", value: "o30" },
];

const VALUE_OPTIONS = [
  { label: "Todos", value: "" },
  { label: "<10M€", value: "u10" },
  { label: "10–30M€", value: "10-30" },
  { label: "30–50M€", value: "30-50" },
  { label: ">50M€", value: "o50" },
];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "var(--accent)" : "var(--surface)",
        color: active ? "var(--bg)" : "var(--text-dim)",
        fontWeight: active ? 700 : 500,
        border: active ? "none" : "1px solid var(--border)",
        borderRadius: "var(--radius-s)",
        padding: "3px 10px",
        fontSize: 11,
        cursor: "pointer",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-body)",
        transition: "background 120ms ease, color 120ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function FilterBar({ currentWeek, totalWeeks }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      router.push(pathname + "?" + params.toString());
    },
    [router, pathname, searchParams]
  );

  const currentAge = searchParams.get("age") ?? "";
  const currentValue = searchParams.get("value") ?? "";

  return (
    <div className="px-6 md:px-10 py-3">
      <div
        className="flex flex-wrap items-center gap-4"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-l)",
          padding: "10px 16px",
        }}
      >
        {/* Week stepper */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentWeek <= 1}
            onClick={() => push("week", String(currentWeek - 1))}
            aria-label="Semana anterior"
            style={{
              width: 28,
              height: 28,
              background: currentWeek <= 1 ? "var(--surface)" : "var(--hover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-s)",
              color: currentWeek <= 1 ? "var(--text-faint)" : "var(--text)",
              cursor: currentWeek <= 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            ‹
          </button>
          <div className="text-center" style={{ minWidth: 52 }}>
            <div
              style={{
                color: "var(--text-faint)",
                fontSize: 8,
                letterSpacing: "0.18em",
                fontFamily: "var(--font-num)",
              }}
            >
              JORNADA
            </div>
            <div
              style={{
                color: "var(--text)",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "var(--font-num)",
              }}
            >
              {String(currentWeek).padStart(2, "0")}/{totalWeeks}
            </div>
          </div>
          <button
            disabled={currentWeek >= totalWeeks}
            onClick={() => push("week", String(currentWeek + 1))}
            aria-label="Semana siguiente"
            style={{
              width: 28,
              height: 28,
              background:
                currentWeek >= totalWeeks ? "var(--surface)" : "var(--hover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-s)",
              color:
                currentWeek >= totalWeeks
                  ? "var(--text-faint)"
                  : "var(--text)",
              cursor: currentWeek >= totalWeeks ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            ›
          </button>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          style={{ width: 1, height: 24, background: "var(--border)" }}
        />

        {/* Age chips */}
        <div className="flex items-center gap-1 flex-wrap">
          <span
            style={{
              color: "var(--text-faint)",
              fontSize: 8,
              letterSpacing: "0.12em",
              fontFamily: "var(--font-num)",
              marginRight: 4,
            }}
          >
            EDAD
          </span>
          {AGE_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              active={currentAge === opt.value}
              onClick={() => push("age", opt.value)}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          aria-hidden
          style={{ width: 1, height: 24, background: "var(--border)" }}
          className="hidden md:block"
        />

        {/* Value chips */}
        <div className="flex items-center gap-1 flex-wrap">
          <span
            style={{
              color: "var(--text-faint)",
              fontSize: 8,
              letterSpacing: "0.12em",
              fontFamily: "var(--font-num)",
              marginRight: 4,
            }}
          >
            VALOR
          </span>
          {VALUE_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              active={currentValue === opt.value}
              onClick={() => push("value", opt.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
