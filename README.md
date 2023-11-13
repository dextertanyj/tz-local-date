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
