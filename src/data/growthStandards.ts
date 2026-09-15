// WHO Child Growth Standards (Median / P50, -2SD / P3, +2SD / P97)
export interface WHOGrowthPoint {
  ageMonths: number;
  weightP3: number;
  weightP50: number;
  weightP97: number;
  heightP3: number;
  heightP50: number;
  heightP97: number;
}

export const WHO_GROWTH_STANDARDS: WHOGrowthPoint[] = [
  { ageMonths: 0, weightP3: 2.5, weightP50: 3.3, weightP97: 4.4, heightP3: 46.3, heightP50: 49.9, heightP97: 53.4 },
  { ageMonths: 2, weightP3: 4.5, weightP50: 5.6, weightP97: 7.1, heightP3: 54.4, heightP50: 58.4, heightP97: 62.4 },
  { ageMonths: 4, weightP3: 5.9, weightP50: 7.0, weightP97: 8.7, heightP3: 59.9, heightP50: 63.9, heightP97: 67.8 },
  { ageMonths: 6, weightP3: 6.7, weightP50: 7.9, weightP97: 9.8, heightP3: 63.6, heightP50: 67.6, heightP97: 71.6 },
  { ageMonths: 9, weightP3: 7.6, weightP50: 8.9, weightP97: 11.0, heightP3: 67.7, heightP50: 72.0, heightP97: 76.2 },
  { ageMonths: 12, weightP3: 8.2, weightP50: 9.6, weightP97: 11.8, heightP3: 71.0, heightP50: 75.7, heightP97: 80.5 },
  { ageMonths: 15, weightP3: 8.8, weightP50: 10.3, weightP97: 12.7, heightP3: 74.1, heightP50: 79.1, heightP97: 84.1 },
  { ageMonths: 18, weightP3: 9.3, weightP50: 10.9, weightP97: 13.5, heightP3: 76.9, heightP50: 82.3, heightP97: 87.7 },
  { ageMonths: 24, weightP3: 10.2, weightP50: 12.2, weightP97: 15.3, heightP3: 81.7, heightP50: 87.8, heightP97: 93.9 },
  { ageMonths: 30, weightP3: 11.2, weightP50: 13.3, weightP97: 16.9, heightP3: 86.2, heightP50: 92.4, heightP97: 99.0 },
  { ageMonths: 36, weightP3: 12.1, weightP50: 14.3, weightP97: 18.3, heightP3: 90.1, heightP50: 96.1, heightP97: 103.1 },
];
