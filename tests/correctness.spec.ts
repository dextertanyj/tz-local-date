import dayjs from "dayjs";
import { describe, expect, test } from "vitest";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { fixtures } from "./correctness.fixtures";

import { LocalDate } from "~/index";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const timezones = ["Asia/Kuching", "UTC", "Pacific/Honolulu"];

describe("consistency", () => {
  for (const timezone of timezones) {
    describe(timezone, () => {
      const ld = new LocalDate(timezone);

      test("startOfDay", () => {
        for (const date of fixtures) {
          expect(ld.startOfDay(date).valueOf()).toBe(
            dayjs(date).tz(timezone).startOf("day").valueOf(),
          );
        }
      });

      test("startOfNextDay", () => {
        for (const date of fixtures) {
          expect(ld.startOfNextDay(date).valueOf()).toBe(
            dayjs(date).tz(timezone).startOf("day").add(1, "day").valueOf(),
          );
        }
      });

      test("startOfPreviousDay", () => {
        for (const date of fixtures) {
          expect(ld.startOfPreviousDay(date).valueOf()).toBe(
            dayjs(date).tz(timezone).startOf("day").subtract(1, "day").valueOf(),
          );
        }
      });

      test("endOfDay", () => {
        for (const date of fixtures) {
          expect(ld.endOfDay(date).valueOf()).toBe(dayjs(date).tz(timezone).endOf("day").valueOf());
        }
      });

      test("isSame", () => {
        for (const outer of fixtures) {
          for (const inner of fixtures) {
            expect(ld.isSame(outer, inner)).toBe(dayjs(outer).tz(timezone).isSame(inner, "day"));
          }
        }
      });

      test("isSameOrAfter", () => {
        for (const outer of fixtures) {
          for (const inner of fixtures) {
            expect(ld.isSameOrAfter(outer, inner)).toBe(
              dayjs(outer).tz(timezone).isSameOrAfter(inner, "day"),
            );
          }
        }
      });

      test("isSameOrBefore", () => {
        for (const outer of fixtures) {
          for (const inner of fixtures) {
            expect(ld.isSameOrBefore(outer, inner)).toBe(
              dayjs(outer).tz(timezone).isSameOrBefore(inner, "day"),
            );
          }
        }
      });

      test("isBefore", () => {
        for (const outer of fixtures) {
          for (const inner of fixtures) {
            expect(ld.isBefore(outer, inner)).toBe(
              dayjs(outer).tz(timezone).isBefore(inner, "day"),
            );
          }
        }
      });

      test("isAfter", () => {
        for (const outer of fixtures) {
          for (const inner of fixtures) {
            expect(ld.isAfter(outer, inner)).toBe(dayjs(outer).tz(timezone).isAfter(inner, "day"));
          }
        }
      });
    });
  }
});
