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

export interface ComparisonOption {
  date: Date;
  label: string;
  result: CalculationResult;
}

export interface AvailabilityOption {
  minimumStay: number;
  date: Date | null;
  waitDays: number | null;
}

const STORAGE_KEY = "schengen_trips_visual_v1";
const PLANNED_ENTRY_STORAGE_KEY = "schengen_planned_entry_v1";

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, n: number): Date {
  const d = startOfDay(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function diffDaysInclusive(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((startOfDay(end).getTime() - startOfDay(start).getTime()) / msPerDay) + 1;
}

function diffDays(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((startOfDay(end).getTime() - startOfDay(start).getTime()) / msPerDay);
}

function normalizeAndMerge(intervals: Trip[]): Trip[] {
  if (!intervals.length) return [];
  const sorted = intervals
    .map((t) => ({ entry: startOfDay(t.entry), exit: startOfDay(t.exit) }))
    .sort((a, b) => a.entry.getTime() - b.entry.getTime());

  const merged: Trip[] = [{ ...sorted[0] }];
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

function calculateOutcome(trips: Trip[], plannedDate: Date): CalculationResult {
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
    return { type: "error", maxDays: 0, lastAllowedDate: null, usedBefore, usedOnLastAllowed: usedBefore };
  }

  const lastAllowedDate = addDays(plannedDate, maxDays - 1);
  const finalWindowStart = addDays(lastAllowedDate, -179);
  const finalIntervals = normalizeAndMerge([...trips, { entry: plannedDate, exit: lastAllowedDate }]);
  const usedOnLastAllowed = countDaysInWindow(finalIntervals, finalWindowStart, lastAllowedDate);

  return { type: "success", maxDays, lastAllowedDate, usedBefore, usedOnLastAllowed };
}

function loadTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((t: { entry: string; exit: string }) => ({
        entry: new Date(t.entry + "T00:00:00"),
        exit: new Date(t.exit + "T00:00:00"),
      }))
      .filter((t: Trip) => !isNaN(t.entry.getTime()) && !isNaN(t.exit.getTime()) && t.exit >= t.entry);
  } catch {
    return [];
  }
}

function saveTrips(trips: Trip[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(trips.map((t) => ({ entry: formatDateStr(t.entry), exit: formatDateStr(t.exit) })))
  );
}

function loadPlannedEntry(): string {
  try {
    const raw = localStorage.getItem(PLANNED_ENTRY_STORAGE_KEY);
    if (!raw) return "";
    const parsed = new Date(raw + "T00:00:00");
    if (isNaN(parsed.getTime())) return "";
    return raw;
  } catch {
    return "";
  }
}

function savePlannedEntry(value: string) {
  if (!value) {
    localStorage.removeItem(PLANNED_ENTRY_STORAGE_KEY);
    return;
  }
  localStorage.setItem(PLANNED_ENTRY_STORAGE_KEY, value);
}

export function useSchengenCalculator() {
  const [trips, setTrips] = useState<Trip[]>(() => normalizeAndMerge(loadTrips()));
  const [plannedEntry, setPlannedEntry] = useState<string>(() => loadPlannedEntry());
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => { saveTrips(trips); }, [trips]);
  useEffect(() => { savePlannedEntry(plannedEntry); }, [plannedEntry]);

  const addTrip = useCallback((entryStr: string, exitStr: string): string | null => {
    if (!entryStr || !exitStr) return "Խնդրում ենք լրացնել մուտքի և ելքի օրերը։";
    const entry = new Date(entryStr + "T00:00:00");
    const exit = new Date(exitStr + "T00:00:00");
    if (isNaN(entry.getTime()) || isNaN(exit.getTime())) return "Ամսաթվի ձևաչափը սխալ է։";
    if (exit < entry) return "Ելքի օրը չի կարող մուտքից շուտ լինել։";
    setTrips((prev) => normalizeAndMerge([...prev, { entry, exit }]));
    setResult(null);
    return null;
  }, []);

  const removeTrip = useCallback((index: number) => {
    setTrips((prev) => { const next = [...prev]; next.splice(index, 1); return next; });
    setResult(null);
  }, []);

  const clearAllTrips = useCallback(() => { setTrips([]); setResult(null); }, []);

  const plannedDate = useMemo(() => {
    if (!plannedEntry) return null;
    const d = new Date(plannedEntry + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }, [plannedEntry]);

  const dashboard = useMemo(() => {
    const totalRecorded = trips.reduce((sum, t) => sum + diffDaysInclusive(t.entry, t.exit), 0);
    if (!plannedDate) {
      return { tripCount: trips.length, totalRecorded, usedBefore: null as number | null, remainingBefore: null as number | null, windowStart: null as Date | null, windowEnd: null as Date | null };
    }
    const windowStart = addDays(plannedDate, -179);
    const windowEnd = addDays(plannedDate, -1);
    const usedBefore = countDaysInWindow(trips, windowStart, windowEnd);
    return { tripCount: trips.length, totalRecorded, usedBefore, remainingBefore: Math.max(0, 90 - usedBefore), windowStart, windowEnd };
  }, [trips, plannedDate]);

  const calculate = useCallback(() => {
    if (!plannedDate) return;
    setResult(calculateOutcome(trips, plannedDate));
  }, [plannedDate, trips]);

  useEffect(() => {
    if (!plannedDate) {
      setResult(null);
      return;
    }
    calculate();
  }, [plannedDate, trips, calculate]);

  const timelineData = useMemo(() => {
    if (!plannedDate) return null;
    const windowStart = addDays(plannedDate, -179);
    const windowEnd = addDays(plannedDate, -1);
    const relevant = trips.map((t) => overlapInterval(t, windowStart, windowEnd)).filter(Boolean) as Trip[];
    return { windowStart, windowEnd, trips: relevant, totalDays: 180 };
  }, [plannedDate, trips]);

  const comparisonOptions = useMemo<ComparisonOption[]>(() => {
    if (!plannedDate) return [];

    const options = [
      { offset: 0, label: "Ընտրված օրը" },
      { offset: 3, label: "3 օր հետո" },
      { offset: 7, label: "1 շաբաթ հետո" },
      { offset: 14, label: "2 շաբաթ հետո" },
      { offset: 30, label: "1 ամիս հետո" },
    ];

    return options.map(({ offset, label }) => {
      const date = addDays(plannedDate, offset);
      return {
        date,
        label,
        result: calculateOutcome(trips, date),
      };
    });
  }, [plannedDate, trips]);

  const availabilityOptions = useMemo<AvailabilityOption[]>(() => {
    if (!plannedDate) return [];

    const minimumStays = [1, 7, 14, 30];

    return minimumStays.map((minimumStay) => {
      let match: Date | null = null;

      for (let offset = 0; offset <= 365; offset++) {
        const candidateDate = addDays(plannedDate, offset);
        const candidateResult = calculateOutcome(trips, candidateDate);
        if (candidateResult.maxDays >= minimumStay) {
          match = candidateDate;
          break;
        }
      }

      return {
        minimumStay,
        date: match,
        waitDays: match ? diffDays(plannedDate, match) : null,
      };
    });
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
    comparisonOptions,
    availabilityOptions,
  };
}
