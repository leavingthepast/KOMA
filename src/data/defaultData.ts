import { Child, ParentProfile } from '../types';

export const DEFAULT_PARENT: ParentProfile = {
  name: 'Parent Name',
  photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  phone: '+855 XX XXX XXX',
  email: 'parent@koma.health.kh',
  address: 'Phnom Penh, Cambodia',
};

export function createInitialChildren(): Child[] {
  return [];
}
