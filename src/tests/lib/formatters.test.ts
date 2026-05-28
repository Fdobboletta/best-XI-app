import { describe, it, expect } from "vitest";
import { fmtMoney, fmtDate, getAge } from "@/app/lib/formatters";

describe("fmtMoney", () => {
  it("formats millions", () => {
    expect(fmtMoney(100_000_000)).toBe("100 M€");
    expect(fmtMoney(25_500_000)).toBe("25,5 M€");
  });

  it("formats thousands", () => {
    expect(fmtMoney(500_000)).toBe("500 k€");
  });

  it("returns — for null", () => {
    expect(fmtMoney(null)).toBe("—");
  });
});

describe("fmtDate", () => {
  it("formats ISO date in Spanish", () => {
    expect(fmtDate("2027-06-30")).toBe("30 jun 2027");
    expect(fmtDate("1996-05-22")).toBe("22 may 1996");
  });

  it("returns — for null", () => {
    expect(fmtDate(null)).toBe("—");
  });
});

describe("getAge", () => {
  it("calculates age from ISO date", () => {
    const thirtyYearsAgo = new Date();
    thirtyYearsAgo.setFullYear(thirtyYearsAgo.getFullYear() - 30);
    const iso = thirtyYearsAgo.toISOString().split("T")[0];
    expect(getAge(iso)).toBe(30);
  });

  it("returns null for null input", () => {
    expect(getAge(null)).toBeNull();
  });
});
