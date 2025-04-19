export interface Player {
  id: number;
  name: string;
  position: string | null;
  clubName: string | null;
  score: number | null;
  image: string | null;
  marketValue: number | null;
  contractEndDate: string | null;
  dateOfBirth: string | null;
}
