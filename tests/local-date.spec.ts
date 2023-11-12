import { describe, expect, test } from "vitest";

import { LocalDate } from "../src/index";

import { Day } from "~/constants";

describe("LocalDate", () => {
  describe("Same timeszone", () => {
    const ld = new LocalDate("Asia/Singapore");

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
        expect(ld.getDay(sun)).toEqual(Day.SUNDAY);

        const mon = new Date("2023-01-02T08:00:00+08:00");
        expect(ld.getDay(mon)).toEqual(Day.MONDAY);

        const tue = new Date("2023-01-03T08:00:00+08:00");
        expect(ld.getDay(tue)).toEqual(Day.TUESDAY);

        const wed = new Date("2023-01-04T08:00:00+08:00");
        expect(ld.getDay(wed)).toEqual(Day.WEDNESDAY);

        const thu = new Date("2023-01-05T08:00:00+08:00");
        expect(ld.getDay(thu)).toEqual(Day.THURSDAY);

        const fri = new Date("2023-01-06T08:00:00+08:00");
        expect(ld.getDay(fri)).toEqual(Day.FRIDAY);

        const sat = new Date("2023-01-07T08:00:00+08:00");
        expect(ld.getDay(sat)).toEqual(Day.SATURDAY);
      });

      test("should return local day given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00+08:00").valueOf();
        const result = ld.getDay(date);
        expect(result).toEqual(Day.SUNDAY);
      });

      test("should return local day given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.getDay(date);
        expect(result).toEqual(Day.SUNDAY);
      });

      test("should return local day given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.getDay(date);
        expect(result).toEqual(Day.SUNDAY);
      });
    });

    describe("toComponents", () => {
      test("should return localised date components given date object", () => {
        const date = new Date("2023-01-01T08:00:00.000+08:00");
        const result = ld.toComponents(date);
        expect(result).toEqual({ year: 2023, month: 1, day: 1 });
      });

      test("should return localised date components given EpochTimeStamp", () => {
        const date = new Date("2023-01-01T08:00:00.000+08:00").valueOf();
        const result = ld.toComponents(date);
        expect(result).toEqual({ year: 2023, month: 1, day: 1 });
      });

      test("should return localised date components given start of day", () => {
        const date = new Date("2023-01-01T00:00:00.000+08:00");
        const result = ld.toComponents(date);
        expect(result).toEqual({ year: 2023, month: 1, day: 1 });
      });

      test("should return localised date components given end of day", () => {
        const date = new Date("2023-01-01T23:59:59.999+08:00");
        const result = ld.toComponents(date);
        expect(result).toEqual({ year: 2023, month: 1, day: 1 });
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

  describe("Daylight Saving Time", () => {
    const ld = new LocalDate("America/Los_Angeles");

    test("should account for DST transitions", () => {
      const datePST = new Date("2023-02-01T00:00:00.000-08:00");
      const ldPST = ld.withDate(datePST);
      const resultPST = ldPST.startOfDay(datePST);
      expect(resultPST).toEqual(new Date("2023-02-01T00:00:00.000-08:00"));
      expect(resultPST).not.toEqual(new Date("2023-02-01T00:00:00.000-07:00"));
      const datePDT = new Date("2023-04-01T00:00:00.000-08:00");
      const ldPDT = ld.withDate(datePDT);
      const resultPDT = ldPDT.startOfDay(datePDT);
      expect(resultPDT).toEqual(new Date("2023-04-01T00:00:00.000-07:00"));
      expect(resultPDT).not.toEqual(new Date("2023-04-01T00:00:00.000-08:00"));
    });
  });
});
