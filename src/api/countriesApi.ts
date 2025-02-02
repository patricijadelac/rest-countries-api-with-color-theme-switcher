const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) throw new Error('Failed to fetch countries');
  return response.json();
};
