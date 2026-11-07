export type Habit = {
  id: string;
  name: string;
  goalPerWeek: number;
  reminderTime?: string; 
  doneDates: string[];   
  photoUrl: string;
};