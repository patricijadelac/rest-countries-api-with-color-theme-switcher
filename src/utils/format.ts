export const formatNumber = (num: number, locale: string = 'de-DE') => {
  return new Intl.NumberFormat(locale).format(num);
};
