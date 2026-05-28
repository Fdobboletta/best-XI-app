const MONTHS_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

export function fmtMoney(value: number | null): string {
  if (value === null) return "—";
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    const formatted = m % 1 === 0 ? `${m}` : m.toFixed(1).replace(".", ",");
    return `${formatted} M€`;
  }
  return `${Math.round(value / 1000)} k€`;
}

export function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS_ES[month - 1]} ${year}`;
}

export function getAge(iso: string | null): number | null {
  if (!iso) return null;
  const dob = new Date(iso);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age--;
  return age;
}
