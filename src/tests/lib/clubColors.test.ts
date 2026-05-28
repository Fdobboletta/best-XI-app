import { describe, it, expect } from "vitest";
import { getClubColor, FALLBACK_COLOR } from "@/app/lib/clubColors";

describe("getClubColor", () => {
  it("returns color for known club", () => {
    const color = getClubColor("Manchester City");
    expect(color.hex).toBe("#6CABDD");
    expect(typeof color.hue).toBe("number");
  });

  it("returns fallback for unknown club", () => {
    const color = getClubColor("Club Desconocido");
    expect(color).toEqual(FALLBACK_COLOR);
  });

  it("returns fallback for null", () => {
    const color = getClubColor(null);
    expect(color).toEqual(FALLBACK_COLOR);
  });
});
