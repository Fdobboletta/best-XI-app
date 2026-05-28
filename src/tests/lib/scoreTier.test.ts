import { describe, it, expect } from "vitest";
import { scoreTier, TIER_STYLES } from "@/app/lib/scoreTier";

describe("scoreTier", () => {
  it("returns elite for score >= 8.3", () => {
    expect(scoreTier(8.3)).toBe("elite");
    expect(scoreTier(9.0)).toBe("elite");
  });

  it("returns strong for 7.5 <= score < 8.3", () => {
    expect(scoreTier(7.5)).toBe("strong");
    expect(scoreTier(8.2)).toBe("strong");
  });

  it("returns ok for 7.0 <= score < 7.5", () => {
    expect(scoreTier(7.0)).toBe("ok");
    expect(scoreTier(7.4)).toBe("ok");
  });

  it("returns low for score < 7.0", () => {
    expect(scoreTier(6.9)).toBe("low");
    expect(scoreTier(0)).toBe("low");
  });

  it("returns low for null score", () => {
    expect(scoreTier(null)).toBe("low");
  });
});

describe("TIER_STYLES", () => {
  it("has bg, text, glow for all tiers", () => {
    const tiers = ["elite", "strong", "ok", "low"] as const;
    tiers.forEach((tier) => {
      expect(TIER_STYLES[tier].bg).toBeTruthy();
      expect(TIER_STYLES[tier].text).toBeTruthy();
      expect(TIER_STYLES[tier].glow).toBeTruthy();
    });
  });
});
