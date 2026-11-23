import type { Habit } from '@/types';
import { habits } from './habits';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function getHabit(id: string): Habit | undefined {
  return habits.find((habit) => habit.id === id);
}

export async function fetchHabits(
  options: { fail?: boolean } = {},
): Promise<Habit[]> {
  await wait(800);
  if (options.fail) throw new Error('Could not load habits');
  return habits;
}