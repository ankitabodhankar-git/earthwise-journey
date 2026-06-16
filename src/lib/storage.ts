'use client';

export const STORAGE_KEYS = {
  CHOICES: 'earthwise_choices',
  HABITS: 'earthwise_habits',
  SCORE: 'earthwise_score',
  RESULTS: 'earthwise_results',
  JOURNEY: 'earthwise_journey',
  PLEDGES: 'earthwise_pledges',
  REFLECTION: 'earthwise_reflection',
  GOALS: 'earthwise_goals',
};

export function saveToLocal<T>(key: string, data: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getFromLocal<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function removeFromLocal(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}
