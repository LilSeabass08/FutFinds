/*
 * Helpers for Create Game schedule time: default seed, 15-minute snapping, and slot lists.
 */
import { addMinutes, roundToNearestMinutes, startOfDay } from 'date-fns';

export const SCHEDULE_TIME_QUARTER_STEP = 15 as const;

export function defaultScheduleTimeSeed(): Date {
  const d = new Date();
  d.setHours(18, 0, 0, 0);
  return d;
}

export function snapScheduleTimeToQuarterHour(d: Date): Date {
  return roundToNearestMinutes(d, { nearestTo: SCHEDULE_TIME_QUARTER_STEP });
}

/** All quarter-hour times on the calendar day of `reference` (local), for web picker lists. */
export function quarterHourSlotsForDay(reference: Date): Date[] {
  const base = startOfDay(reference);
  const slots: Date[] = [];
  for (let i = 0; i < 96; i++) {
    slots.push(addMinutes(base, i * SCHEDULE_TIME_QUARTER_STEP));
  }
  return slots;
}
