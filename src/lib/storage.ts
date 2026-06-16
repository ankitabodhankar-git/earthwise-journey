
'use client';

export const STORAGE_KEYS = {
  ASSESSMENT: 'greenpath_assessment',
  GOALS: 'greenpath_goals',
  RESULTS: 'greenpath_results',
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
