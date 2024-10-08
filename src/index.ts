import {
  Day,
  DAY_TO_MILLISECONDS,
  DAYS,
  DEFAULT_FORMAT,
  FORMAT_REGEX,
  HOURS_TO_MILLISECONDS,
  MINUTES_TO_MILLISECONDS,
  SECONDS_TO_MILLISECONDS,
} from "./constants.js";

export { Day } from "./constants.js";

function extractReferenceParts(parts: Intl.DateTimeFormatPart[]) {
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const hour = parts.find((part) => part.type === "hour")?.value;
  const minute = parts.find((part) => part.type === "minute")?.value;
  const second = parts.find((part) => part.type === "second")?.value;

  if (!year || !month || !day || !hour || !minute || !second) {
    throw new RangeError("Invalid date format");
  }

  return {
    year: parseInt(year),
    month: parseInt(month) - 1,
    day: parseInt(day),
    hour: parseInt(hour) % 24,
    minute: parseInt(minute),
    second: parseInt(second),
  };
}

export class LocalDate {
  private offset: number;

  constructor(
    private timezone: string,
    reference: Date | number | undefined = undefined,
  ) {
    const referenceDate = reference ? new Date(reference) : new Date(0);
    const utcOffset = new Date(referenceDate);
    // We need to reset the milliseconds component since Intl.DateTimeFormat does not support milliseconds
    utcOffset.setMilliseconds(0);

    const referenceParts = Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour12: false,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).formatToParts(reference ?? 0);

    const { year, month, day, hour, minute, second } = extractReferenceParts(referenceParts);

    const timezoneOffset = new Date(0);
    timezoneOffset.setUTCFullYear(year, month, day);
    timezoneOffset.setUTCHours(hour, minute, second, 0);

    this.offset = timezoneOffset.valueOf() - utcOffset.valueOf();
  }

  private toNormalizedTimestamp(date: Date | number): number {
    if (date instanceof Date) {
      date = date.valueOf();
    }

    // WARNING: We must not use this to convert between LocalDate and EpochTimeStamp.
    return date + this.offset;
  }

  private toNormalizedLocalDate(date: Date | number): Date {
    return new Date(this.toNormalizedTimestamp(date));
  }

  private getLocalDate(date: Date | number) {
    const normalizedLocal = this.toNormalizedLocalDate(date);

    return (
      normalizedLocal.getUTCFullYear() * 10000 +
      (normalizedLocal.getUTCMonth() + 1) * 100 +
      normalizedLocal.getUTCDate()
    );
  }

  at(reference: Date | number) {
    return new LocalDate(this.timezone, reference);
  }

  startOfDay(date: Date | number): Date {
    const normalizedLocal = this.toNormalizedLocalDate(date);

    normalizedLocal.setUTCHours(0, 0, 0, 0);

    const revertedTime = new Date(normalizedLocal.valueOf() - this.offset);
    return revertedTime;
  }

  startOfNextDay(date: Date | number): Date {
    const current = this.startOfDay(date).valueOf();
    return new Date(current + DAY_TO_MILLISECONDS);
  }

  startOfPreviousDay(date: Date | number): Date {
    const current = this.startOfDay(date).valueOf();
    return new Date(current - DAY_TO_MILLISECONDS);
  }

  endOfDay(date: Date | number): Date {
    const nextDay = this.startOfNextDay(date);
    return new Date(nextDay.valueOf() - 1);
  }

  getComponents(date: Date | number): { year: number; month: number; day: number } {
    const normalizedLocal = this.toNormalizedLocalDate(date);

    return {
      year: normalizedLocal.getUTCFullYear(),
      month: normalizedLocal.getUTCMonth() + 1,
      day: normalizedLocal.getUTCDate(),
    };
  }

  getDay(date: Date | number): Day | null {
    const normalizedLocal = this.toNormalizedLocalDate(date);

    return DAYS[normalizedLocal.getUTCDay()] ?? null;
  }

  getMillisecondsFromStartOfDay(date: Date | number) {
    const normalizedLocal = this.toNormalizedLocalDate(date);

    return (
      normalizedLocal.getUTCHours() * HOURS_TO_MILLISECONDS +
      normalizedLocal.getUTCMinutes() * MINUTES_TO_MILLISECONDS +
      normalizedLocal.getUTCSeconds() * SECONDS_TO_MILLISECONDS +
      normalizedLocal.getUTCMilliseconds()
    );
  }

  format(date: Date | number, format: string = DEFAULT_FORMAT) {
    const { year, month, day } = this.getComponents(date);

    const matches = (match: string) => {
      switch (match) {
        case "YY":
          return String(year).slice(-2);
        case "YYYY":
          return String(year).padStart(4, "0");
        case "M":
          return String(month);
        case "MM":
          return String(month).padStart(2, "0");
        case "D":
          return String(day);
        case "DD":
          return String(day).padStart(2, "0");
        default:
          break;
      }
      return null;
    };

    return format.replace(FORMAT_REGEX, (match) => matches(match) ?? match);
  }

  isSame(lhs: Date | number, rhs: Date | number) {
    // Both values should be integers
    return this.getLocalDate(lhs) === this.getLocalDate(rhs);
  }

  isSameOrBefore(lhs: Date | number, rhs: Date | number) {
    return this.getLocalDate(lhs) <= this.getLocalDate(rhs);
  }

  isBefore(lhs: Date | number, rhs: Date | number) {
    return this.getLocalDate(lhs) < this.getLocalDate(rhs);
  }

  isAfter(lhs: Date | number, rhs: Date | number) {
    return this.getLocalDate(lhs) > this.getLocalDate(rhs);
  }

  isSameOrAfter(lhs: Date | number, rhs: Date | number) {
    return this.getLocalDate(lhs) >= this.getLocalDate(rhs);
  }
}
