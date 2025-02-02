export interface CountryProps {
  name: { common: string };
  flags: { svg: string };
  population: number;
  region: string;
  capital: string[];
}
