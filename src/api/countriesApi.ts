const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) throw new Error('Failed to fetch countries');
  return response.json();
};

export const fetchCountriesByRegion = async (region: string) => {
  const response = await fetch(`${BASE_URL}/region/${region}`);
  if (!response.ok) throw new Error('Failed to fetch countries by region');
  return response.json();
};

export const fetchCountryByName = async (name: string) => {
  const response = await fetch(`${BASE_URL}/name/${name}`);
  if (!response.ok) throw new Error('Failed to fetch country details');
  return response.json();
};

export const fetchCountryByFullName = async (name: string) => {
  const response = await fetch(`${BASE_URL}/name/${name}?fullText=true`);
  if (!response.ok) throw new Error('Failed to fetch country details');
  return response.json();
};
