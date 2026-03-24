import { useState, useCallback, useEffect, useMemo } from "react";

export interface Trip {
  entry: Date;
  exit: Date;
}

export interface CalculationResult {
  type: "success" | "error";
  maxDays: number;
  lastAllowedDate: Date | null;
  usedBefore: number;
  usedOnLastAllowed: number;
}

const STORAGE_KEY = "schengen_trips_visual_v1";

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, n: number): Date {
  const d = startOfDay(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function diffDaysInclusive(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((startOfDay(end).getTime() - startOfDay(start).getTime()) / msPerDay) + 1;
}

function normalizeAndMerge(intervals: Trip[]): Trip[] {
  if (!intervals.length) return [];
  const sorted = intervals
    .map((t) => ({ entry: startOfDay(t.entry), exit: startOfDay(t.exit) }))
    .sort((a, b) => a.entry.getTime() - b.entry.getTime());

  const merged: Trip[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];
    if (current.entry <= addDays(last.exit, 1)) {
      if (current.exit > last.exit) last.exit = current.exit;
    } else {
      merged.push({ entry: current.entry, exit: current.exit });
    }
  }
  return merged;
}

function countDaysInWindow(intervals: Trip[], windowStart: Date, windowEnd: Date): number {
  let total = 0;
  for (const trip of intervals) {
    const start = trip.entry > windowStart ? trip.entry : windowStart;
    const end = trip.exit < windowEnd ? trip.exit : windowEnd;
    if (start <= end) total += diffDaysInclusive(start, end);
  }
  return total;
}

export function overlapInterval(interval: Trip, windowStart: Date, windowEnd: Date): Trip | null {
  const start = interval.entry > windowStart ? interval.entry : windowStart;
  const end = interval.exit < windowEnd ? interval.exit : windowEnd;
  if (start <= end) return { entry: start, exit: end };
  return null;
}

function loadTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((t: { entry: string; exit: string }) => ({
        entry: new Date(t.entry),
        exit: new Date(t.exit),
      }))
      .filter((t: Trip) => !isNaN(t.entry.getTime()) && !isNaN(t.exit.getTime()) && t.exit >= t.entry);
  } catch {
    return [];
  }
}

function saveTrips(trips: Trip[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(trips.map((t) => ({ entry: formatDate(t.entry), exit: formatDate(t.exit) })))
  );
}

export function useSchengenCalculator() {
  const [trips, setTrips] = useState<Trip[]>(() => normalizeAndMerge(loadTrips()));
  const [plannedEntry, setPlannedEntry] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  const addTrip = useCallback((entryStr: string, exitStr: string): string | null => {
    const entry = new Date(entryStr);
    const exit = new Date(exitStr);
    if (isNaN(entry.getTime()) || isNaN(exit.getTime())) return "Խնdelays delays delays";
    if (exit < entry) return " Delays";
    setTrips((prev) => normalizeAndMerge([...prev, { entry, exit }]));
    setResult(null);
    return null;
  }, []);

  const removeTrip = useCallback((index: number) => {
    setTrips((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
    setResult(null);
  }, []);

  const clearAllTrips = useCallback(() => {
    setTrips([]);
    setResult(null);
  }, []);

  const plannedDate = useMemo(() => {
    if (!plannedEntry) return null;
    const d = new Date(plannedEntry);
    return isNaN(d.getTime()) ? null : d;
  }, [plannedEntry]);

  const dashboard = useMemo(() => {
    const totalRecorded = trips.reduce((sum, t) => sum + diffDaysInclusive(t.entry, t.exit), 0);

    if (!plannedDate) {
      return {
        tripCount: trips.length,
        totalRecorded,
        usedBefore: null as number | null,
        remainingBefore: null as number | null,
        windowStart: null as Date | null,
        windowEnd: null as Date | null,
      };
    }

    const windowStart = addDays(plannedDate, -179);
    const windowEnd = addDays(plannedDate, -1);
    const usedBefore = countDaysInWindow(trips, windowStart, windowEnd);

    return {
      tripCount: trips.length,
      totalRecorded,
      usedBefore,
      remainingBefore: Math.max(0, 90 - usedBefore),
      windowStart,
      windowEnd,
    };
  }, [trips, plannedDate]);

  const calculate = useCallback(() => {
    if (!plannedDate) return;

    const usedBefore = countDaysInWindow(trips, addDays(plannedDate, -179), addDays(plannedDate, -1));
    let maxDays = 0;

    for (let i = 0; i < 90; i++) {
      const currentDate = addDays(plannedDate, i);
      const windowStart = addDays(currentDate, -179);
      const simulatedStay: Trip = { entry: plannedDate, exit: currentDate };
      const allIntervals = normalizeAndMerge([...trips, simulatedStay]);
      const daysInWindow = countDaysInWindow(allIntervals, windowStart, currentDate);
      if (daysInWindow <= 90) {
        maxDays = i + 1;
      } else {
        break;
      }
    }

    if (maxDays === 0) {
      setResult({ type: "error", maxDays: 0, lastAllowedDate: null, usedBefore, usedOnLastAllowed: usedBefore });
      return;
    }

    const lastAllowedDate = addDays(plannedDate, maxDays - 1);
    const finalWindowStart = addDays(lastAllowedDate, -179);
    const finalIntervals = normalizeAndMerge([...trips, { entry: plannedDate, exit: lastAllowedDate }]);
    const usedOnLastAllowed = countDaysInWindow(finalIntervals, finalWindowStart, lastAllowedDate);

    setResult({ type: "success", maxDays, lastAllowedDate, usedBefore, usedOnLastAllowed });
  }, [plannedDate, trips]);

  const timelineData = useMemo(() => {
    if (!plannedDate) return null;
    const windowStart = addDays(plannedDate, -179);
    const windowEnd = addDays(plannedDate, -1);
    const relevant = trips
      .map((t) => overlapInterval(t, windowStart, windowEnd))
      .filter(Boolean) as Trip[];

    return {
      windowStart,
      windowEnd,
      trips: relevant,
      totalDays: 180,
    };
  }, [plannedDate, trips]);

  return {
    trips,
    plannedEntry,
    setPlannedEntry,
    addTrip,
    removeTrip,
    clearAllTrips,
    dashboard,
    result,
    calculate,
    timelineData,
    formatDate,
    diffDaysInclusive: (s: Date, e: Date) => diffDaysInclusive(s, e),
  };
}
