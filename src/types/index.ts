export interface CountryProps {
  name: {
    common: string;
    nativeName: {
      [key: string]: { official: string; common: string };
    };
  };
  flags: { svg: string; alt: string };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: {
    [key: string]: { name: string; symbol: string };
  };
  languages: { [key: string]: string };
  borders?: string[];
}
