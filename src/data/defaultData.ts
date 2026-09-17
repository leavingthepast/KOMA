import { Child, ParentProfile } from '../types';
import { generateVaccineSchedule } from './cambodiaVaccineSchedule';

export const DEFAULT_PARENT: ParentProfile = {
  name: 'Parent Name',
  photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  phone: '+855 XX XXX XXX',
  email: 'parent@koma.health.kh',
  address: 'Phnom Penh, Cambodia',
};

export const DEMO_PARENT: ParentProfile = {
  name: 'Sokha Chan (Demo)',
  photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  phone: '+855 12 345 678',
  email: 'demo.parent@koma.health.kh',
  address: 'Phnom Penh, Cambodia',
};

export function createInitialChildren(): Child[] {
  return [];
}

export function createDemoChildren(): Child[] {
  const birthDate1 = '2025-06-15'; // ~1 year old child
  const birthDate2 = '2026-02-10'; // ~7 months old child

  const vaccines1 = generateVaccineSchedule(birthDate1);
  if (vaccines1.length > 0) vaccines1[0].isCompleted = true;
  if (vaccines1.length > 1) vaccines1[1].isCompleted = true;
  if (vaccines1.length > 2) vaccines1[2].isCompleted = true;

  const vaccines2 = generateVaccineSchedule(birthDate2);
  if (vaccines2.length > 0) vaccines2[0].isCompleted = true;

  return [
    {
      id: 'demo-child-1',
      name: 'Dara Chan',
      gender: 'male',
      photoUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&auto=format&fit=crop&q=80',
      birthDate: birthDate1,
      birthTime: '08:30',
      birthLocation: 'National Pediatric Hospital, Phnom Penh',
      bloodType: 'O+',
      allergies: 'None recorded',
      colorTheme: '#10b981',
      vaccines: vaccines1,
      growthRecords: [
        { id: 'g1', date: '2025-06-15', ageMonths: 0, weightKg: 3.2, heightCm: 50 },
        { id: 'g2', date: '2025-08-15', ageMonths: 2, weightKg: 5.4, heightCm: 58 },
        { id: 'g3', date: '2025-12-15', ageMonths: 6, weightKg: 7.8, heightCm: 66 },
        { id: 'g4', date: '2026-06-15', ageMonths: 12, weightKg: 9.6, heightCm: 74 },
      ],
    },
    {
      id: 'demo-child-2',
      name: 'Bopha Chan',
      gender: 'female',
      photoUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&auto=format&fit=crop&q=80',
      birthDate: birthDate2,
      birthTime: '14:15',
      birthLocation: 'Calmette Hospital, Phnom Penh',
      bloodType: 'A+',
      allergies: 'Mild milk sensitivity',
      colorTheme: '#3b82f6',
      vaccines: vaccines2,
      growthRecords: [
        { id: 'g20', date: '2026-02-10', ageMonths: 0, weightKg: 3.0, heightCm: 49 },
        { id: 'g21', date: '2026-05-10', ageMonths: 3, weightKg: 5.8, heightCm: 60 },
      ],
    },
  ];
}
