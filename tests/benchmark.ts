import dayjs from "dayjs";
import { Bench } from "tinybench";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { LocalDate } from "~/index";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

dayjs.tz.setDefault("Asia/Singapore");

const ld = new LocalDate("Asia/Singapore");
let date1 = new Date();
let date2 = new Date();

const bench = new Bench({
  time: 100,
  setup: () => {
    date1 = new Date();
    date2 = new Date();
  },
});

bench
  .add("LocalDate:startOfDay", () => {
    ld.startOfDay(date1);
  })
  .add("dayjs:startOfDay", () => {
    dayjs(date1).tz().startOf("day");
  })
  .add("LocalDate:startOfNextDay", () => {
    ld.startOfNextDay(date1);
  })
  .add("dayjs:startOfNextDay", () => {
    dayjs(date1).tz().startOf("day").add(1, "day");
  })
  .add("LocalDate:startOfPreviousDay", () => {
    ld.startOfPreviousDay(date1);
  })
  .add("dayjs:startOfPreviousDay", () => {
    dayjs(date1).tz().startOf("day").subtract(1, "day");
  })
  .add("LocalDate:endOfDay", () => {
    ld.endOfDay(date1);
  })
  .add("dayjs:endOfDay", () => {
    dayjs(date1).tz().endOf("day");
  })
  .add("LocalDate:isSame", () => {
    ld.isSame(date1, date2);
  })
  .add("dayjs:isSame", () => {
    dayjs(date1).tz().isSame(date2, "day");
  })
  .add("LocalDate:isSameOrBefore", () => {
    ld.isSameOrBefore(date1, date2);
  })
  .add("dayjs:isSameOrBefore", () => {
    dayjs(date1).tz().isSameOrBefore(date2, "day");
  })
  .add("LocalDate:isSameOrAfter", () => {
    ld.isSameOrAfter(date1, date2);
  })
  .add("dayjs:isSameOrAfter", () => {
    dayjs(date1).tz().isSameOrAfter(date2, "day");
  })
  .add("LocalDate:isBefore", () => {
    ld.isBefore(date1, date2);
  })
  .add("dayjs:isBefore", () => {
    dayjs(date1).tz().isBefore(date2, "day");
  })
  .add("LocalDate:isAfter", () => {
    ld.isAfter(date1, date2);
  })
  .add("dayjs:isAfter", () => {
    dayjs(date1).tz().isAfter(date2, "day");
  });

await bench.run();

// eslint-disable-next-line no-console
console.table(bench.table());
