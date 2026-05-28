// Player data — Premier League matchweek 1, 2023/24
// Mirrors the screenshot the user sent so the redesign sits 1:1.
const PLAYERS = [
  {
    pos: "GK",  posName: "Arquero",                  slot: { x: 6,  y: 50 },
    name: "Bernd Leno",      last: "Leno",      club: "Fulham",            clubAbbr: "FUL",
    score: 6.7, marketValue: 14_000_000, contractEnd: "2026-06-30", dob: "1992-03-04",
    accent: "#CC2A2A", hue: 0,
  },
  {
    pos: "LB",  posName: "Lateral izquierdo",        slot: { x: 22, y: 14 },
    name: "Destiny Udogie", last: "Udogie",    club: "Tottenham",         clubAbbr: "TOT",
    score: 8.4, marketValue: 40_000_000, contractEnd: "2030-06-30", dob: "2002-11-28",
    accent: "#132257", hue: 220,
  },
  {
    pos: "CB",  posName: "Defensor central",         slot: { x: 22, y: 36 },
    name: "Craig Dawson",    last: "Dawson",    club: "Wolves",            clubAbbr: "WOL",
    score: 8.5, marketValue:  4_500_000, contractEnd: "2025-06-30", dob: "1990-05-06",
    accent: "#FDB913", hue: 42,
  },
  {
    pos: "CB",  posName: "Defensor central",         slot: { x: 22, y: 58 },
    name: "Jan Paul van Hecke", last: "van Hecke", club: "Brighton",       clubAbbr: "BHA",
    score: 8.4, marketValue: 30_000_000, contractEnd: "2027-06-30", dob: "2000-06-08",
    accent: "#0057B8", hue: 215,
  },
  {
    pos: "RB",  posName: "Lateral derecho",          slot: { x: 22, y: 82 },
    name: "Aaron Wan-Bissaka", last: "Wan-Bissaka", club: "West Ham",      clubAbbr: "WHU",
    score: 8.4, marketValue: 25_000_000, contractEnd: "2029-06-30", dob: "1997-11-26",
    accent: "#7A263A", hue: 350,
  },
  {
    pos: "CM",  posName: "Mediocampista",            slot: { x: 50, y: 22 },
    name: "Bruno Fernandes", last: "Fernandes", club: "Manchester United", clubAbbr: "MUN",
    score: 8.0, marketValue: 55_000_000, contractEnd: "2027-06-30", dob: "1994-09-08",
    accent: "#DA291C", hue: 5,
  },
  {
    pos: "DM",  posName: "Mediocampista defensivo",  slot: { x: 50, y: 50 },
    name: "Yves Bissouma",   last: "Bissouma",  club: "Tottenham",         clubAbbr: "TOT",
    score: 7.3, marketValue: 30_000_000, contractEnd: "2026-06-30", dob: "1996-08-30",
    accent: "#132257", hue: 220,
  },
  {
    pos: "AM",  posName: "Mediocampista ofensivo",   slot: { x: 50, y: 78 },
    name: "James Maddison",  last: "Maddison",  club: "Tottenham",         clubAbbr: "TOT",
    score: 7.3, marketValue: 45_000_000, contractEnd: "2028-06-30", dob: "1996-11-23",
    accent: "#132257", hue: 220,
  },
  {
    pos: "LW",  posName: "Extremo izquierdo",        slot: { x: 78, y: 22 },
    name: "Kaoru Mitoma",    last: "Mitoma",    club: "Brighton",          clubAbbr: "BHA",
    score: 7.5, marketValue: 50_000_000, contractEnd: "2027-06-30", dob: "1997-05-20",
    accent: "#0057B8", hue: 215,
  },
  {
    pos: "FW",  posName: "Delantero centro",         slot: { x: 78, y: 50 },
    name: "Carlton Morris",  last: "Morris",    club: "Luton Town",        clubAbbr: "LUT",
    score: 8.5, marketValue: 11_000_000, contractEnd: "2027-06-30", dob: "1995-12-16",
    accent: "#F78F1E", hue: 28,
  },
  {
    pos: "RW",  posName: "Extremo derecho",          slot: { x: 78, y: 78 },
    name: "Jarrod Bowen",    last: "Bowen",     club: "West Ham",          clubAbbr: "WHU",
    score: 6.4, marketValue: 60_000_000, contractEnd: "2027-06-30", dob: "1996-12-20",
    accent: "#7A263A", hue: 350,
  },
];

// Pretty formatters
const fmtMoney = (v) => {
  if (v == null) return "—";
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1).replace(".", ",")} M €`;
  if (v >= 1_000)     return `${(v / 1_000).toFixed(0)} k €`;
  return `${v} €`;
};
const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};
const ageFromDob = (iso) => {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00"), now = new Date("2023-08-12");
  let a = now.getFullYear() - d.getFullYear();
  if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) a--;
  return a;
};

// Score → tier (drives badge color + ring color)
// Three tiers keeps the pitch readable instead of a rainbow.
const scoreTier = (s) => {
  if (s == null) return "muted";
  if (s >= 8.3) return "elite";   // gold
  if (s >= 7.5) return "strong";  // green
  if (s >= 7.0) return "ok";      // sky
  return "low";                   // amber
};
const TIER_BG = {
  elite:  "linear-gradient(180deg, #F7D261 0%, #E0A93A 100%)",
  strong: "linear-gradient(180deg, #5DE8A1 0%, #1FB36B 100%)",
  ok:     "linear-gradient(180deg, #7AC8FF 0%, #2F8FE0 100%)",
  low:    "linear-gradient(180deg, #F5A45A 0%, #D9762B 100%)",
  muted:  "linear-gradient(180deg, #7A8090 0%, #545968 100%)",
};
const TIER_TEXT = {
  elite: "#3A2606", strong: "#063C20", ok: "#08243F", low: "#3D1B05", muted: "#0F1218",
};
const TIER_GLOW = {
  elite:  "rgba(247, 210, 97, 0.55)",
  strong: "rgba(93, 232, 161, 0.45)",
  ok:     "rgba(122, 200, 255, 0.40)",
  low:    "rgba(245, 164, 90, 0.40)",
  muted:  "rgba(120, 130, 150, 0.30)",
};

// Avatar — synthetic portrait built from initials + club-tinted gradient.
// (We don't have photo rights so we don't fake them with random faces.)
const Avatar = ({ p, size = 56 }) => {
  const initials = p.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  const grad = `radial-gradient(120% 120% at 30% 20%,
                  hsl(${p.hue} 55% 38%) 0%,
                  hsl(${p.hue} 50% 22%) 55%,
                  #0d1117 100%)`;
  return (
    <div
      className="bxi-avatar"
      style={{
        width: size, height: size,
        background: grad,
        fontSize: size * 0.34,
      }}
      aria-label={p.name}
    >
      <span>{initials}</span>
    </div>
  );
};

Object.assign(window, {
  PLAYERS, fmtMoney, fmtDate, ageFromDob,
  scoreTier, TIER_BG, TIER_TEXT, TIER_GLOW,
  Avatar,
});
