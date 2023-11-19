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

export class LocalDate {
  private offset: number;

  constructor(
    private timezone: string,
    reference: Date | number | undefined = undefined,
  ) {
    const timezoneOffsetString = Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "longOffset",
    })
      .formatToParts(reference ?? 0)
      .find((part) => part.type === "timeZoneName");
    const timezoneOffset = {
      hour: 0,
      minute: 0,
    };

    if (timezoneOffsetString) {
      const offset = timezoneOffsetString.value.slice(3); // Remove GMT
      const [hour, minute] = offset.split(":");
      if (hour) timezoneOffset.hour = parseInt(hour, 10);
      if (minute) timezoneOffset.minute = parseInt(minute, 10);
    }

    this.offset = timezoneOffset.hour * 60 * 60 * 1000 + timezoneOffset.minute * 60 * 1000;
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
