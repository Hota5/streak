import type { Habit } from '@/types';

export const habits: Habit[] = [
  {
    id: '1',
    name: 'Drink water',
    goalPerWeek: 7,
    reminderTime: '09:00',
    doneDates: ['2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06'],
    photoUrl: 'https://picsum.photos/seed/water/600/400',
  },
  {
    id: '2',
    name: 'Read 20 pages',
    goalPerWeek: 5,
    reminderTime: '21:30',
    doneDates: ['2026-11-04', '2026-11-05'],
    photoUrl: 'https://picsum.photos/seed/book/600/400',
  },
  {
    id: '3',
    name: 'Gym',
    goalPerWeek: 3,
    reminderTime: '18:00',
    doneDates: ['2026-11-02', '2026-11-05'],
    photoUrl: 'https://picsum.photos/seed/gym/600/400',
  },
  {
    id: '4',
    name: 'No sugar',
    goalPerWeek: 7,
    doneDates: ['2026-11-01', '2026-11-02', '2026-11-03'],
    photoUrl: 'https://picsum.photos/seed/fruit/600/400',
  },
  {
    id: '5',
    name: 'Walk on Trebević',
    goalPerWeek: 2,
    doneDates: ['2026-11-01'],
    photoUrl: 'https://picsum.photos/seed/trebevic/600/400',
  },
];