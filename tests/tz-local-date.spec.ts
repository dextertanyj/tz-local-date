import { describe, expect, test } from "vitest";

import { LocalDate } from "../src/index";

describe("LocalDate", () => {
  describe("Same timeszone", () => {
    const ld = new LocalDate("Asia/Singapore", new Date("1981-12-31T16:00:00+00:00"));

    describe("startOfDay", () => {
      test("should return start of local day given date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        const result = ld.startOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T00:00:00.000+08:00"));
      });

      test("should return start of local day given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00+08:00").valueOf();
        const result = ld.startOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T00:00:00.000+08:00"));
      });

      test("should return start of local day given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.startOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T00:00:00.000+08:00"));
      });

      test("should return start of local day given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.startOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T00:00:00.000+08:00"));
      });
    });

    describe("startOfNextDay", () => {
      test("should return start of next local day given date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        const result = ld.startOfNextDay(date);
        expect(result).toEqual(new Date("2023-01-02T00:00:00.000+08:00"));
      });

      test("should return start of next local day given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00+08:00").valueOf();
        const result = ld.startOfNextDay(date);
        expect(result).toEqual(new Date("2023-01-02T00:00:00.000+08:00"));
      });

      test("should return start of next local day given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.startOfNextDay(date);
        expect(result).toEqual(new Date("2023-01-02T00:00:00.000+08:00"));
      });

      test("should return start of next local day given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.startOfNextDay(date);
        expect(result).toEqual(new Date("2023-01-02T00:00:00.000+08:00"));
      });
    });

    describe("startOfPreviousDay", () => {
      test("should return start of previous local day given date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        const result = ld.startOfPreviousDay(date);
        expect(result).toEqual(new Date("2022-12-31T00:00:00.000+08:00"));
      });

      test("should return start of previous local day given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00+08:00").valueOf();
        const result = ld.startOfPreviousDay(date);
        expect(result).toEqual(new Date("2022-12-31T00:00:00.000+08:00"));
      });

      test("should return start of previous local day given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.startOfPreviousDay(date);
        expect(result).toEqual(new Date("2022-12-31T00:00:00.000+08:00"));
      });

      test("should return start of previous local day given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.startOfPreviousDay(date);
        expect(result).toEqual(new Date("2022-12-31T00:00:00.000+08:00"));
      });
    });

    describe("endOfDay", () => {
      test("should return end of local day given date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        const result = ld.endOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T23:59:59.999+08:00"));
      });

      test("should return end of local day given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00+08:00").valueOf();
        const result = ld.endOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T23:59:59.999+08:00"));
      });

      test("should return end of local day given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.endOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T23:59:59.999+08:00"));
      });

      test("should return end of local day given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.endOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T23:59:59.999+08:00"));
      });
    });

    describe("getLocalTimeMilliseconds", () => {
      test("should return time from start of day given date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        const result = ld.getMillisecondsFromStartOfDay(date);
        expect(result).toEqual(8 * 60 * 60 * 1000);
      });

      test("should return time from start of day given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00+08:00").valueOf();
        const result = ld.getMillisecondsFromStartOfDay(date);
        expect(result).toEqual(8 * 60 * 60 * 1000);
      });

      test("should return time from start of day given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.getMillisecondsFromStartOfDay(date);
        expect(result).toEqual(0);
      });

      test("should return time from start of day given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.getMillisecondsFromStartOfDay(date);
        expect(result).toEqual(86400 * 1000 - 1);
      });
    });

    describe("getLocalDay", () => {
      test("should return local day given date object", () => {
        const sun = new Date("2023-01-01T08:00:00+08:00");
        expect(ld.getDay(sun)).toEqual("Sunday");

        const mon = new Date("2023-01-02T08:00:00+08:00");
        expect(ld.getDay(mon)).toEqual("Monday");

        const tue = new Date("2023-01-03T08:00:00+08:00");
        expect(ld.getDay(tue)).toEqual("Tuesday");

        const wed = new Date("2023-01-04T08:00:00+08:00");
        expect(ld.getDay(wed)).toEqual("Wednesday");

        const thu = new Date("2023-01-05T08:00:00+08:00");
        expect(ld.getDay(thu)).toEqual("Thursday");

        const fri = new Date("2023-01-06T08:00:00+08:00");
        expect(ld.getDay(fri)).toEqual("Friday");

        const sat = new Date("2023-01-07T08:00:00+08:00");
        expect(ld.getDay(sat)).toEqual("Saturday");
      });

      test("should return local day given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00+08:00").valueOf();
        const result = ld.getDay(date);
        expect(result).toEqual("Sunday");
      });

      test("should return local day given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.getDay(date);
        expect(result).toEqual("Sunday");
      });

      test("should return local day given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.getDay(date);
        expect(result).toEqual("Sunday");
      });

      test("should return null given invalid date", () => {
        const date = new Date("Invalid Date");
        const result = ld.getDay(date);
        expect(result).toEqual(null);
      });
    });

    describe("getComponents", () => {
      test("should return localised date components given date object", () => {
        const date = new Date("2023-01-01T08:00:00.000+08:00");
        const result = ld.getComponents(date);
        expect(result).toEqual({ year: 2023, month: 1, day: 1 });
      });

      test("should return localised date components given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00.000+08:00").valueOf();
        const result = ld.getComponents(date);
        expect(result).toEqual({ year: 2023, month: 1, day: 1 });
      });

      test("should return localised date components given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.getComponents(date);
        expect(result).toEqual({ year: 2023, month: 1, day: 1 });
      });

      test("should return localised date components given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.getComponents(date);
        expect(result).toEqual({ year: 2023, month: 1, day: 1 });
      });
    });

    describe("format", () => {
      test("should return default format given no format string", () => {
        const date = new Date("2023-01-02T08:00:00.000+08:00");
        const result = ld.format(date);
        expect(result).toEqual("2023-01-02");
      });

      test("should return short components", () => {
        const date = new Date("2023-01-02T08:00:00.000+08:00");
        const result = ld.format(date, "YY-M-D");
        expect(result).toEqual("23-1-2");
      });

      test("should support alternative delimiters", () => {
        const date = new Date("2023-01-02T08:00:00.000+08:00");
        const result = ld.format(date, "YYYY/MM/DD");
        expect(result).toEqual("2023/01/02");
      });

      test("should support out of order substitutions", () => {
        const date = new Date("2023-01-02T08:00:00.000+08:00");
        const result = ld.format(date, "MM-DD-YYYY");
        expect(result).toEqual("01-02-2023");
      });

      test("should support partial format", () => {
        const date = new Date("2023-01-02T08:00:00.000+08:00");
        const result = ld.format(date, "DD-MM");
        expect(result).toEqual("02-01");
      });

      test("should support repeated elements", () => {
        const date = new Date("2023-01-02T08:00:00.000+08:00");
        const result = ld.format(date, "YYYY-MM-MM");
        expect(result).toEqual("2023-01-01");
      });
    });

    describe("isSame", () => {
      test("should return true given same date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        expect(ld.isSame(date, date)).toEqual(true);
      });

      test("should return true given same date and time", () => {
        const date1 = new Date("2023-01-01T08:00:00.000+08:00");
        const date2 = new Date("2023-01-01T08:00:00.000+08:00");
        expect(ld.isSame(date1, date2)).toEqual(true);
      });

      test("should return true given same date with different times", () => {
        const date1 = new Date("2023-01-01T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isSame(date1, date2)).toEqual(true);
      });

      test("should return false given different dates", () => {
        const date1 = new Date("2023-01-01T23:59:59.999+08:00");
        const date2 = new Date("2023-01-02T00:00:00.000+08:00");
        expect(ld.isSame(date1, date2)).toEqual(false);
      });
    });

    describe("isSameOrBefore", () => {
      test("should return true given same date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        expect(ld.isSameOrBefore(date, date)).toEqual(true);
      });

      test("should return true given same date and time", () => {
        const date1 = new Date("2023-01-01T08:00:00.000+08:00");
        const date2 = new Date("2023-01-01T08:00:00.000+08:00");
        expect(ld.isSameOrBefore(date1, date2)).toEqual(true);
      });

      test("should return true given same date with different times", () => {
        const date1 = new Date("2023-01-01T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isSameOrBefore(date1, date2)).toEqual(true);
      });

      test("should return true given an earlier date", () => {
        const date1 = new Date("2022-12-31T23:59:59.999+08:00");
        const date2 = new Date("2023-01-01T00:00:00.000+08:00");
        expect(ld.isSameOrBefore(date1, date2)).toEqual(true);
      });

      test("should return false given a later date", () => {
        const date1 = new Date("2023-01-02T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isSameOrBefore(date1, date2)).toEqual(false);
      });
    });

    describe("isSameOrAfter", () => {
      test("should return true given same date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        expect(ld.isSameOrAfter(date, date)).toEqual(true);
      });

      test("should return true given same date and time", () => {
        const date1 = new Date("2023-01-01T08:00:00.000+08:00");
        const date2 = new Date("2023-01-01T08:00:00.000+08:00");
        expect(ld.isSameOrAfter(date1, date2)).toEqual(true);
      });

      test("should return true given same date with different times", () => {
        const date1 = new Date("2023-01-01T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isSameOrAfter(date1, date2)).toEqual(true);
      });

      test("should return true given a later date", () => {
        const date1 = new Date("2023-01-02T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isSameOrAfter(date1, date2)).toEqual(true);
      });

      test("should return false given an earlier date", () => {
        const date1 = new Date("2022-12-31T23:59:59.999+08:00");
        const date2 = new Date("2023-01-01T00:00:00.000+08:00");
        expect(ld.isSameOrAfter(date1, date2)).toEqual(false);
      });
    });

    describe("isBefore", () => {
      test("should return true given an earlier date", () => {
        const date1 = new Date("2022-12-31T23:59:59.999+08:00");
        const date2 = new Date("2023-01-01T00:00:00.000+08:00");
        expect(ld.isBefore(date1, date2)).toEqual(true);
      });

      test("should return false given same date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        expect(ld.isBefore(date, date)).toEqual(false);
      });

      test("should return false given same date and time", () => {
        const date1 = new Date("2023-01-01T08:00:00.000+08:00");
        const date2 = new Date("2023-01-01T08:00:00.000+08:00");
        expect(ld.isBefore(date1, date2)).toEqual(false);
      });

      test("should return false given same date with different times", () => {
        const date1 = new Date("2023-01-01T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isBefore(date1, date2)).toEqual(false);
      });

      test("should return false given a later date", () => {
        const date1 = new Date("2023-01-02T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isBefore(date1, date2)).toEqual(false);
      });
    });

    describe("isAfter", () => {
      test("should return true given a later date", () => {
        const date1 = new Date("2023-01-02T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isAfter(date1, date2)).toEqual(true);
      });

      test("should return false given same date object", () => {
        const date = new Date("2023-01-01T08:00:00+08:00");
        expect(ld.isAfter(date, date)).toEqual(false);
      });

      test("should return false given same date and time", () => {
        const date1 = new Date("2023-01-01T08:00:00.000+08:00");
        const date2 = new Date("2023-01-01T08:00:00.000+08:00");
        expect(ld.isAfter(date1, date2)).toEqual(false);
      });

      test("should return false given same date with different times", () => {
        const date1 = new Date("2023-01-01T00:00:00.000+08:00");
        const date2 = new Date("2023-01-01T23:59:59.999+08:00");
        expect(ld.isAfter(date1, date2)).toEqual(false);
      });

      test("should return false given an earlier date", () => {
        const date1 = new Date("2022-12-31T23:59:59.999+08:00");
        const date2 = new Date("2023-01-01T00:00:00.000+08:00");
        expect(ld.isAfter(date1, date2)).toEqual(false);
      });
    });
  });

  describe("Extreme timezones", () => {
    describe("UTC-12", () => {
      const ld = new LocalDate("Etc/GMT+12");

      describe("startOfDay", () => {
        test("should return start of local day given date object", () => {
          const date = new Date("2023-01-01T08:00:00-12:00");
          const result = ld.startOfDay(date);
          expect(result).toEqual(new Date("2023-01-01T00:00:00.000-12:00"));
        });
      });
    });

    describe("UTC+12", () => {
      const ld = new LocalDate("Etc/GMT-12");

      describe("startOfDay", () => {
        test("should return start of local day given date object", () => {
          const date = new Date("2023-01-01T08:00:00+12:00");
          const result = ld.startOfDay(date);
          expect(result).toEqual(new Date("2023-01-01T00:00:00.000+12:00"));
        });
      });
    });

    describe("UTC+14", () => {
      const ld = new LocalDate("Etc/GMT-14");

      describe("startOfDay", () => {
        test("should return start of local day given date object", () => {
          const date = new Date("2023-01-01T08:00:00+14:00");
          const result = ld.startOfDay(date);
          expect(result).toEqual(new Date("2023-01-01T00:00:00.000+14:00"));
        });
      });
    });
  });

  describe("Different timezones", () => {
    const ld = new LocalDate("UTC");

    describe("startOfDay", () => {
      test("should return start of local day given date object from another timezone", () => {
        const date = new Date("2023-01-01T08:00:00-01:00");
        const result = ld.startOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T00:00:00.000+00:00"));
      });
    });

    describe("startOfNextDay", () => {
      test("should return start of next local day given date object from another timezone", () => {
        const date = new Date("2023-01-01T08:00:00-01:00");
        const result = ld.startOfNextDay(date);
        expect(result).toEqual(new Date("2023-01-02T00:00:00.000+00:00"));
      });
    });

    describe("startOfPreviousDay", () => {
      test("should return start of previous local day given date object from another timezone", () => {
        const date = new Date("2023-01-01T08:00:00-01:00");
        const result = ld.startOfPreviousDay(date);
        expect(result).toEqual(new Date("2022-12-31T00:00:00.000+00:00"));
      });
    });

    describe("endOfDay", () => {
      test("should return end of local day given date object from another timezone", () => {
        const date = new Date("2023-01-01T08:00:00-01:00");
        const result = ld.endOfDay(date);
        expect(result).toEqual(new Date("2023-01-01T23:59:59.999+00:00"));
      });
    });

    describe("isSame", () => {
      test("should return true given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isSame(date1, date2)).toEqual(true);
      });

      test("should return false given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T07:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isSame(date1, date2)).toEqual(false);
      });

      test("should return false given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T15:00:00-08:00");
        expect(ld.isSame(date1, date2)).toEqual(false);
      });
    });

    describe("isSameOrBefore", () => {
      test("should return true given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isSameOrBefore(date1, date2)).toEqual(true);
      });

      test("should return true given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T07:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isSameOrBefore(date1, date2)).toEqual(true);
      });

      test("should return false given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T15:00:00-08:00");
        expect(ld.isSameOrBefore(date1, date2)).toEqual(false);
      });
    });

    describe("isSameOrAfter", () => {
      test("should return true given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isSameOrAfter(date1, date2)).toEqual(true);
      });

      test("should return false given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T07:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isSameOrAfter(date1, date2)).toEqual(false);
      });

      test("should return true given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T15:00:00-08:00");
        expect(ld.isSameOrAfter(date1, date2)).toEqual(true);
      });
    });

    describe("isBefore", () => {
      test("should return false given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isBefore(date1, date2)).toEqual(false);
      });

      test("should return true given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T07:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isBefore(date1, date2)).toEqual(true);
      });

      test("should return false given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T15:00:00-08:00");
        expect(ld.isBefore(date1, date2)).toEqual(false);
      });
    });

    describe("isAfter", () => {
      test("should return false given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isAfter(date1, date2)).toEqual(false);
      });

      test("should return false given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T07:00:00+08:00");
        const date2 = new Date("2022-12-31T16:00:00-08:00");
        expect(ld.isAfter(date1, date2)).toEqual(false);
      });

      test("should return true given date objects from two different timezones", () => {
        const date1 = new Date("2023-01-01T08:00:00+08:00");
        const date2 = new Date("2022-12-31T15:00:00-08:00");
        expect(ld.isAfter(date1, date2)).toEqual(true);
      });
    });
  });

  describe("Daylight Saving Time", () => {
    const ld = new LocalDate("America/Los_Angeles");

    test("should account for DST transitions", () => {
      const datePST = new Date("2023-02-01T00:00:00.000-08:00");
      const ldPST = ld.at(datePST);
      const resultPST = ldPST.startOfDay(datePST);
      expect(resultPST).toEqual(new Date("2023-02-01T00:00:00.000-08:00"));
      expect(resultPST).not.toEqual(new Date("2023-02-01T00:00:00.000-07:00"));
      const datePDT = new Date("2023-04-01T00:00:00.000-08:00");
      const ldPDT = ld.at(datePDT);
      const resultPDT = ldPDT.startOfDay(datePDT);
      expect(resultPDT).toEqual(new Date("2023-04-01T00:00:00.000-07:00"));
      expect(resultPDT).not.toEqual(new Date("2023-04-01T00:00:00.000-08:00"));
    });
  });
});
