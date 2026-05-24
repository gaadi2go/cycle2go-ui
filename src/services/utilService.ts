import { Cycle } from '../models/Cycle';

export function countDays(startDate: Date, endDate: Date): number {
  let start = startDate;
  let end = endDate;

  if (start.getTime() > end.getTime()) {
    end = start;
  }

  const differenceMs = end.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  let days = Math.floor(differenceMs / oneDay);

  if (days === 0) {
    days = 1;
  }
  return days;
}

export function calculatePrice(days: number, cycle: Cycle): number {
  let amt = 0;
  if (days === 0) days = 1;

  if (days >= 30) {
    amt = days * Number(cycle.monthPlus);
  } else if (days >= 15) {
    amt = days * Number(cycle.twoWeekPlus);
  } else if (days >= 7) {
    amt = days * Number(cycle.weekPlus);
  } else if (days >= 1) {
    amt = days * Number(cycle.dailyPrice);
  }
  return amt;
}
