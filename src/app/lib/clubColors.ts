export interface ClubColor {
  hex: string;
  hue: number;
}

export const FALLBACK_COLOR: ClubColor = { hex: "#5B6273", hue: 220 };

const CLUB_COLORS: Record<string, ClubColor> = {
  "Arsenal": { hex: "#EF0107", hue: 0 },
  "Aston Villa": { hex: "#95BFE5", hue: 210 },
  "Brentford": { hex: "#E30613", hue: 2 },
  "Brighton & Hove Albion": { hex: "#0057B8", hue: 215 },
  "Burnley": { hex: "#6C1D45", hue: 320 },
  "Chelsea": { hex: "#034694", hue: 218 },
  "Crystal Palace": { hex: "#1B458F", hue: 220 },
  "Everton": { hex: "#003399", hue: 228 },
  "Fulham": { hex: "#CC2A2A", hue: 0 },
  "Liverpool": { hex: "#C8102E", hue: 350 },
  "Luton Town": { hex: "#F78F1E", hue: 35 },
  "Manchester City": { hex: "#6CABDD", hue: 205 },
  "Manchester United": { hex: "#DA291C", hue: 4 },
  "Newcastle United": { hex: "#241F20", hue: 0 },
  "Nottingham Forest": { hex: "#DD0000", hue: 0 },
  "Sheffield United": { hex: "#EE2737", hue: 352 },
  "Tottenham Hotspur": { hex: "#132257", hue: 230 },
  "West Ham United": { hex: "#7A263A", hue: 345 },
  "Wolverhampton Wanderers": { hex: "#FDB913", hue: 45 },
  "Bournemouth": { hex: "#DA291C", hue: 4 },
};

export function getClubColor(clubName: string | null): ClubColor {
  if (!clubName) return FALLBACK_COLOR;
  return CLUB_COLORS[clubName] ?? FALLBACK_COLOR;
}
