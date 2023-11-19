# Local Date

[![CI](https://github.com/dextertanyj/local-date/actions/workflows/ci.yml/badge.svg)](https://github.com/dextertanyj/local-date/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/dextertanyj/local-date/badge.svg?branch=master)](https://coveralls.io/github/dextertanyj/local-date?branch=master)

Fast timezone-aware date comparsion and manipulation.

## Features

- ⚡️ Fast date calculations using native `Date` objects
- 🌏 Timezone-aware with support for daylight saving time
- 🪶 Lightweight with no dependencies

## Quickstart

**1. Install `local-date`.**

```shell
npm install local-date
```

**2. Initialize an instance with the desired timezone.**

```ts
const ld = new LocalDate("UTC");
```

**3. Start comparing and manipulating dates.**

```ts
const now = new Date();

const startOfToday = ld.startOfDay(now);
const tomorrow = ld.startOfNextDay(now);

ld.isAfter(tomorrow, startOfToday); // returns true
```

## API Reference

### Constructor

**`LocalDate`** \
`LocalDate(timezone: string, reference?: Date | number)`

Constructs a new `LocalDate` instance configured with the given timezone.
All calculations and comparisons using the constructed `LocalDate` instance will normalize given inputs to the configured timezone.\
The given timezone must be a valid IANA TZ identifier.

The optional `reference` parameter determines the date which is used to calculate the offset of the given timezone from UTC.
This parameter is useful for timezones with daylight saving time, or has changed since 1 Jan 1970.
_Defaults to UNIX epoch._

### Date Manipulation

**`LocalDate::startOfDay`** \
`startOfDay(date: Date | number): Date`

Returns a `Date` representing the start of the day (i.e. 12 midnight) of the given date.

```ts
const ld = new LocalDate("Asia/Singapore");

ld.startOfDay(new Date("2023-01-01T12:34:56+08:00")); // Returns new Date('2023-01-01T00:00:00.000+08:00')

// The date returned is indepdenent of the timezone used to contruct the given Date object.
ld.staryOfDay(new Date("2023-01-01T04:03:02+00:00")); // Returns new Date('2023-01-01T00:00:00.000+08:00')
```

**`LocalDate::startOfNextDay`** \
`startOfNextDay(date: Date | number): Date`

Returns a `Date` representing the start of the next day of the given date.

```ts
const ld = new LocalDate("Asia/Singapore");

ld.startOfNextDay(new Date("2023-01-01T12:34:56+08:00")); // Returns new Date('2023-01-02T00:00:00.000+08:00')
```

**`LocalDate::startOfPreviousDay`** \
`startOfPreviousDay(date: Date | number): Date`

Returns a `Date` representing the start of the previous day of the given date.

```ts
const ld = new LocalDate("Asia/Singapore");

ld.startOfNextDay(new Date("2023-01-01T12:34:56+08:00")); // Returns new Date('2022-12-31T00:00:00.000+08:00')
```

**`LocalDate::endOfDay`** \
`endOfDay(date: Date | number): Date`

Returns a `Date` representing the end of the day (i.e. 1 millisecond before 12 midnight) of the given date.

```ts
const ld = new LocalDate("Asia/Singapore");

ld.endOfDay(new Date("2023-01-01T12:34:56+08:00")); // Returns new Date('2023-01-01T23:59:59.999+08:00')
```

### Date Comparison

**`LocalDate::isSame`** \
`isSame(lhs: Date | number, rhs: Date | number): boolean`

Returns `true` if `lhs` has the same date as `rhs` in the configured timezone, `false` otherwise.

**`LocalDate::isSameOrBefore`** \
`isSameOrBefore(lhs: Date | number, rhs: Date | number): boolean`

Returns `true` if `lhs` has the same date as or is before `rhs` in the configured timezone, `false` otherwise.

**`LocalDate::isSameOrAfter`** \
`isSameOrAfter(lhs: Date | number, rhs: Date | number): boolean`

Returns `true` if `lhs` has the same date as or is after `rhs` in the configured timezone, `false` otherwise.

**`LocalDate::isBefore`** \
`isBefore(lhs: Date | number, rhs: Date | number): boolean`

Returns `true` if the date `lhs` is strictly before the date of `rhs` in the configured timezone, `false` otherwise. \
Ignores the time components of `lhs` and `rhs`.

**`LocalDate::isAfter`** \
`isAfter(lhs: Date | number, rhs: Date | number): boolean`

Returns `true` if the date `lhs` is strictly after the date of `rhs` in the configured timezone, `false` otherwise. \
Ignores the time components of `lhs` and `rhs`.

### Date Parsing

**`LocalDate::toComponents`** \
`toComponents(date: Date | number): { year: number; month: number; day: number }`

Returns the year, month, and day of month of the given date, localized to the configured timezone.

**`LocalDate::getDay`** \
`getDay(date: Date | number): "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"`

Returns the day of the week of the given date, localized to the configured timezone.

**`LocalDate::getMillisecondsFromStartOfDay`** \
`getMillisecondsFromStartOfDay(date: Date | number): number`

Returns the number of milliseconds the given date is from the start of the day (i.e. 12 midnight), localized to the configured timezone.

### Daylight Saving Time Adjustments

**`LocalDate::at`** \
`at(reference: Date | number): LocalDate`

Returns a new `LocalDate` instance with its `reference` set to the given date.
