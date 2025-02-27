const BASE_URL = 'https://restcountries.com/v3.1';

const fetchData = async (url: string, errorMessage?: string) => {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(errorMessage ?? `Failed to fetch data from ${url}`);
  return response.json();
};

export const fetchAllCountries = () =>
  fetchData(`${BASE_URL}/all`, 'Failed to fetch countries');

export const fetchCountriesByRegion = (region: string) =>
  fetchData(
    `${BASE_URL}/region/${region}`,
    'Failed to fetch countries by region'
  );

export const fetchCountryByName = (name: string) =>
  fetchData(`${BASE_URL}/name/${name}`, 'Failed to fetch country details');

export const fetchCountryByFullName = async (name: string) => {
  const data = await fetchData(
    `${BASE_URL}/name/${name}?fullText=true`,
    'Failed to fetch country details'
  );
  return data[0];
};

export const fetchByListOfCodes = async (codes: string[]) =>
  fetchData(
    `${BASE_URL}/alpha?codes=${codes.join(',')}`,
    'Failed to fetch countries by codes'
  );
