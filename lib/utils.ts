import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function daysUntil(date: string) {
  const diff = new Date(date).getTime() - Date.now();
  if (diff <= 0) return "Happening now";
  const days = Math.ceil(diff / 86400000);
  return `${days} day${days !== 1 ? "s" : ""} away`;
}
