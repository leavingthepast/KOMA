export type Language = 'en' | 'kh';

export type VaccineCategoryType = 
  | 'BCG'
  | 'OPV'
  | 'HIB'
  | 'PCV'
  | 'OTHER';

export interface VaccineDose {
  id: string;
  category: VaccineCategoryType;
  nameEn: string;
  nameKh: string;
  doseNumber: number;
  totalDoses: number;
  recommendedAgeMonths: number;
  recommendedAgeLabelEn: string;
  recommendedAgeLabelKh: string;
  isCompleted: boolean;
  dueDate: string; // ISO date string YYYY-MM-DD
  completedDate?: string; // YYYY-MM-DD
  hospital?: string;
  lotNumber?: string;
  notes?: string;
}

export interface GrowthRecord {
  id: string;
  date: string; // YYYY-MM-DD
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm?: number;
  notes?: string;
}

export interface Child {
  id: string;
  name: string;
  gender: 'male' | 'female';
  photoUrl: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthLocation: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown';
  allergies: string;
  colorTheme: string; // Hex color for calendar representation
  vaccines: VaccineDose[];
  growthRecords: GrowthRecord[];
}

export interface ParentProfile {
  name: string;
  photoUrl: string;
  phone: string;
  email: string;
  address: string;
}

export interface NotificationItem {
  id: string;
  childId: string;
  childName: string;
  vaccineDoseId: string;
  vaccineNameEn: string;
  vaccineNameKh: string;
  dueDate: string;
  daysRemaining: number;
  isUrgent: boolean;
}
