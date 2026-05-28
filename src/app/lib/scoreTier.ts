export type Tier = "elite" | "strong" | "ok" | "low";

export function scoreTier(score: number | null): Tier {
  if (score === null || score < 7.0) return "low";
  if (score < 7.5) return "ok";
  if (score < 8.3) return "strong";
  return "elite";
}

export const TIER_STYLES: Record<Tier, { bg: string; text: string; glow: string }> = {
  elite: {
    bg: "linear-gradient(180deg, #F7D261 0%, #E0A93A 100%)",
    text: "#0A0C12",
    glow: "0 0 10px rgba(247,210,97,0.45)",
  },
  strong: {
    bg: "linear-gradient(180deg, #5DE8A1 0%, #1FB36B 100%)",
    text: "#0A0C12",
    glow: "0 0 10px rgba(93,232,161,0.45)",
  },
  ok: {
    bg: "linear-gradient(180deg, #7AC8FF 0%, #2F8FE0 100%)",
    text: "#0A0C12",
    glow: "0 0 10px rgba(122,200,255,0.45)",
  },
  low: {
    bg: "linear-gradient(180deg, #F5A45A 0%, #D9762B 100%)",
    text: "#0A0C12",
    glow: "0 0 10px rgba(245,164,90,0.45)",
  },
};
