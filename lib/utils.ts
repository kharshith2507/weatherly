import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RecentSearch } from "@/types/weather";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ── Local storage ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "weatherly_recent_searches";
const MAX_RECENT = 5;

export function getRecentSearches(): RecentSearch[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as RecentSearch[]) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(city: string, country: string): void {
  if (typeof window === "undefined") return;
  try {
    const searches = getRecentSearches();
    const filtered = searches.filter(
      (s) => s.city.toLowerCase() !== city.toLowerCase()
    );
    const updated: RecentSearch[] = [
      { city, country, timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // silently fail
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently fail
  }
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── Relative time ─────────────────────────────────────────────────────────────
export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
