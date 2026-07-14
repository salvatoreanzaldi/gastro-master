import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Entfernt Markdown-Reste aus Meta-/Titel-Text, den der Blog-Generator
 * versehentlich unverarbeitet gelassen hat (z.B. `[Praxis-Guide](/de/...)`).
 * Nur für Titel/Description/Keywords gedacht — NICHT auf Body-Content anwenden.
 */
export function stripMarkdown(text: string): string {
  return String(text ?? "")
    // Verschachtelte Links zuerst: [text]([text](url)) → text
    .replace(/\[([^\]]+)\]\(\[[^\]]+\]\([^)]*\)\)/g, "$1")
    // Standard-Markdown-Links [text](url) → text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    // Fett / Kursiv / Inline-Code
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}
