import { VaccineCategoryType, VaccineDose } from '../types';

export interface VaccineTemplate {
  category: VaccineCategoryType;
  nameEn: string;
  nameKh: string;
  doseNumber: number;
  totalDoses: number;
  offsetDays: number;
  recommendedAgeMonths: number;
  recommendedAgeLabelEn: string;
  recommendedAgeLabelKh: string;
}

export const CAMBODIAN_HOSPITALS = [
  { en: 'Kantha Bopha Hospital (Phnom Penh)', kh: 'មន្ទីរពេទ្យគន្ធបុប្ផា (ភ្នំពេញ)' },
  { en: 'National Pediatric Hospital (NPH)', kh: 'មន្ទីរពេទ្យកុមារជាតិ' },
  { en: 'Angkor Hospital for Children (Siem Reap)', kh: 'មន្ទីរពេទ្យកុមារអង្គរ (សៀមរាប)' },
  { en: 'Calmette Hospital', kh: 'មន្ទីរពេទ្យកាល់ម៉ែត' },
  { en: 'Jayavarman VII Hospital (Kantha Bopha II)', kh: 'មន្ទីរពេទ្យជ័យវរ្ម័នទី៧' },
  { en: 'Khmer-Soviet Friendship Hospital', kh: 'មន្ទីរពេទ្យមិត្តភាពខ្មែរ-សូវៀត' },
  { en: 'Local Commune Health Center (MOH)', kh: 'មណ្ឌលសុខភាពមូលដ្ឋាន' },
  { en: 'Tuol Kouk Health Center', kh: 'មណ្ឌលសុខភាពទួលគោក' },
  { en: 'Chbar Ampov Health Center', kh: 'មណ្ឌលសុខភាពច្បារអំពៅ' },
];

export const CAMBODIA_NATIONAL_SCHEDULE: VaccineTemplate[] = [
  // Birth (Day 0)
  {
    category: 'BCG',
    nameEn: 'BCG (Tuberculosis)',
    nameKh: 'BCG (ជំងឺរបេង)',
    doseNumber: 1,
    totalDoses: 1,
    offsetDays: 0,
    recommendedAgeMonths: 0,
    recommendedAgeLabelEn: 'At Birth (within 24h)',
    recommendedAgeLabelKh: 'ពេលកើតភ្លាម (ក្នុង ២៤ម៉ោង)',
  },
  {
    category: 'OTHER',
    nameEn: 'HepB Birth Dose',
    nameKh: 'រលាកថ្លើមបេ (ដូសកើតភ្លាម)',
    doseNumber: 1,
    totalDoses: 1,
    offsetDays: 0,
    recommendedAgeMonths: 0,
    recommendedAgeLabelEn: 'At Birth (within 24h)',
    recommendedAgeLabelKh: 'ពេលកើតភ្លាម (ក្នុង ២៤ម៉ោង)',
  },

  // 6 Weeks (42 days / 1.5 months)
  {
    category: 'HIB',
    nameEn: 'Pentavalent 1 (DTP-HepB-Hib)',
    nameKh: 'ថ្នាំបង្ការ៥មុខ លើកទី១ (DTP-HepB-Hib 1)',
    doseNumber: 1,
    totalDoses: 3,
    offsetDays: 42,
    recommendedAgeMonths: 1.5,
    recommendedAgeLabelEn: '6 Weeks (1.5 months)',
    recommendedAgeLabelKh: 'អាយុ ៦ សប្តាហ៍',
  },
  {
    category: 'OPV',
    nameEn: 'OPV 1 (Polio drops)',
    nameKh: 'OPV 1 (ដំណក់ស្វិតដៃជើង ១)',
    doseNumber: 1,
    totalDoses: 3,
    offsetDays: 42,
    recommendedAgeMonths: 1.5,
    recommendedAgeLabelEn: '6 Weeks',
    recommendedAgeLabelKh: 'អាយុ ៦ សប្តាហ៍',
  },
  {
    category: 'PCV',
    nameEn: 'PCV 1 (Pneumococcal)',
    nameKh: 'PCV 1 (រលាកសួតបាក់តេរី ១)',
    doseNumber: 1,
    totalDoses: 3,
    offsetDays: 42,
    recommendedAgeMonths: 1.5,
    recommendedAgeLabelEn: '6 Weeks',
    recommendedAgeLabelKh: 'អាយុ ៦ សប្តាហ៍',
  },

  // 10 Weeks (70 days / 2.5 months)
  {
    category: 'HIB',
    nameEn: 'Pentavalent 2 (DTP-HepB-Hib)',
    nameKh: 'ថ្នាំបង្ការ៥មុខ លើកទី២ (DTP-HepB-Hib 2)',
    doseNumber: 2,
    totalDoses: 3,
    offsetDays: 70,
    recommendedAgeMonths: 2.5,
    recommendedAgeLabelEn: '10 Weeks (2.5 months)',
    recommendedAgeLabelKh: 'អាយុ ១០ សប្តាហ៍',
  },
  {
    category: 'OPV',
    nameEn: 'OPV 2 (Polio drops)',
    nameKh: 'OPV 2 (ដំណក់ស្វិតដៃជើង ២)',
    doseNumber: 2,
    totalDoses: 3,
    offsetDays: 70,
    recommendedAgeMonths: 2.5,
    recommendedAgeLabelEn: '10 Weeks',
    recommendedAgeLabelKh: 'អាយុ ១០ សប្តាហ៍',
  },
  {
    category: 'PCV',
    nameEn: 'PCV 2 (Pneumococcal)',
    nameKh: 'PCV 2 (រលាកសួតបាក់តេរី ២)',
    doseNumber: 2,
    totalDoses: 3,
    offsetDays: 70,
    recommendedAgeMonths: 2.5,
    recommendedAgeLabelEn: '10 Weeks',
    recommendedAgeLabelKh: 'អាយុ ១០ សប្តាហ៍',
  },

  // 14 Weeks (98 days / 3.5 months)
  {
    category: 'HIB',
    nameEn: 'Pentavalent 3 (DTP-HepB-Hib)',
    nameKh: 'ថ្នាំបង្ការ៥មុខ លើកទី៣ (DTP-HepB-Hib 3)',
    doseNumber: 3,
    totalDoses: 3,
    offsetDays: 98,
    recommendedAgeMonths: 3.5,
    recommendedAgeLabelEn: '14 Weeks (3.5 months)',
    recommendedAgeLabelKh: 'អាយុ ១៤ សប្តាហ៍',
  },
  {
    category: 'OPV',
    nameEn: 'OPV 3 (Polio drops)',
    nameKh: 'OPV 3 (ដំណក់ស្វិតដៃជើង ៣)',
    doseNumber: 3,
    totalDoses: 3,
    offsetDays: 98,
    recommendedAgeMonths: 3.5,
    recommendedAgeLabelEn: '14 Weeks',
    recommendedAgeLabelKh: 'អាយុ ១៤ សប្តាហ៍',
  },
  {
    category: 'OTHER',
    nameEn: 'IPV 1 (Inactivated Polio Injection)',
    nameKh: 'IPV 1 (ចាក់ថ្នាំស្វិតដៃជើង ១)',
    doseNumber: 1,
    totalDoses: 2,
    offsetDays: 98,
    recommendedAgeMonths: 3.5,
    recommendedAgeLabelEn: '14 Weeks',
    recommendedAgeLabelKh: 'អាយុ ១៤ សប្តាហ៍',
  },
  {
    category: 'PCV',
    nameEn: 'PCV 3 (Pneumococcal)',
    nameKh: 'PCV 3 (រលាកសួតបាក់តេរី ៣)',
    doseNumber: 3,
    totalDoses: 3,
    offsetDays: 98,
    recommendedAgeMonths: 3.5,
    recommendedAgeLabelEn: '14 Weeks',
    recommendedAgeLabelKh: 'អាយុ ១៤ សប្តាហ៍',
  },

  // 9 Months (274 days)
  {
    category: 'OTHER',
    nameEn: 'Measles-Rubella 1 (MR 1)',
    nameKh: 'កញ្ជ្រិល-ស្អូច លើកទី១ (MR 1)',
    doseNumber: 1,
    totalDoses: 2,
    offsetDays: 274,
    recommendedAgeMonths: 9,
    recommendedAgeLabelEn: '9 Months',
    recommendedAgeLabelKh: 'អាយុ ៩ ខែ',
  },
  {
    category: 'OTHER',
    nameEn: 'Japanese Encephalitis (JE)',
    nameKh: 'ថ្នាំបង្ការជម្ងឺរលាកខួរក្បាលជេអ៊ី',
    doseNumber: 1,
    totalDoses: 1,
    offsetDays: 274,
    recommendedAgeMonths: 9,
    recommendedAgeLabelEn: '9 Months',
    recommendedAgeLabelKh: 'អាយុ ៩ ខែ',
  },
  {
    category: 'OTHER',
    nameEn: 'IPV 2 (Polio Injection 2)',
    nameKh: 'IPV 2 (ចាក់ថ្នាំស្វិតដៃជើង ២)',
    doseNumber: 2,
    totalDoses: 2,
    offsetDays: 274,
    recommendedAgeMonths: 9,
    recommendedAgeLabelEn: '9 Months',
    recommendedAgeLabelKh: 'អាយុ ៩ ខែ',
  },

  // 18 Months (548 days / 1.5 years)
  {
    category: 'OTHER',
    nameEn: 'Measles-Rubella 2 (MR 2)',
    nameKh: 'កញ្ជ្រិល-ស្អូច លើកទី២ (MR 2)',
    doseNumber: 2,
    totalDoses: 2,
    offsetDays: 548,
    recommendedAgeMonths: 18,
    recommendedAgeLabelEn: '18 Months (1.5 Years)',
    recommendedAgeLabelKh: 'អាយុ ១៨ ខែ (១ខួបកន្លះ)',
  },

];

/**
 * Calculates calendar due date based on birth date string (YYYY-MM-DD) and offset in days
 */
export function calculateDueDate(birthDateStr: string, offsetDays: number): string {
  const [year, month, day] = birthDateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + offsetDays);
  
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Generates the full personalized Cambodian vaccine schedule for a newly registered child
 */
export function generateVaccineSchedule(birthDateStr: string): VaccineDose[] {
  return CAMBODIA_NATIONAL_SCHEDULE.map((tpl, idx) => {
    return {
      id: `vac-${idx}-${Date.now().toString().slice(-4)}`,
      category: tpl.category,
      nameEn: tpl.nameEn,
      nameKh: tpl.nameKh,
      doseNumber: tpl.doseNumber,
      totalDoses: tpl.totalDoses,
      recommendedAgeMonths: tpl.recommendedAgeMonths,
      recommendedAgeLabelEn: tpl.recommendedAgeLabelEn,
      recommendedAgeLabelKh: tpl.recommendedAgeLabelKh,
      isCompleted: false,
      dueDate: calculateDueDate(birthDateStr, tpl.offsetDays),
    };
  });
}

/**
 * Calculates human-readable age in English and Khmer
 */
export function calculateAge(birthDateStr: string): {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  labelEn: string;
  labelKh: string;
} {
  const [y, m, d] = birthDateStr.split('-').map(Number);
  const birth = new Date(y, m - 1, d);
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMonths = Math.max(0, years * 12 + months);

  let labelEn = '';
  let labelKh = '';

  if (years > 0) {
    labelEn = `${years} yr ${months} mo`;
    labelKh = `${years} ឆ្នាំ ${months} ខែ`;
  } else if (months > 0) {
    labelEn = `${months} mo ${days} d`;
    labelKh = `${months} ខែ ${days} ថ្ងៃ`;
  } else {
    labelEn = `${days} days`;
    labelKh = `${days} ថ្ងៃ`;
  }

  return { years, months, days, totalMonths, labelEn, labelKh };
}

/**
 * Check if today is the child's birthday!
 */
export function isBirthdayToday(birthDateStr: string, simulatedDate?: Date): boolean {
  if (!birthDateStr) return false;
  const now = simulatedDate || new Date();
  const [, m, d] = birthDateStr.split('-').map(Number);
  return now.getMonth() + 1 === m && now.getDate() === d;
}

/**
 * Formats a date string nicely
 */
export function formatDate(dateStr: string, lang: 'en' | 'kh' = 'en'): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (lang === 'kh') {
    return `${d}/${m}/${y}`;
  }
  return `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${y}`;
}
