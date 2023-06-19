// https://www.codewars.com/kata/52685f7382004e774f0001f7/train/typescript
// nodemon -x npx ts-node ./human-readable-time.ts -w ./human-readable-time.ts

const MAX_READABLE_SECONDS = 359999;

export function humanReadable(rawSeconds: number): string {

  if (rawSeconds < 0 || rawSeconds > MAX_READABLE_SECONDS) {
    throw new Error(`Invalid input: ${rawSeconds} seconds`);
  }

  let temp = rawSeconds;
  const hours = Math.floor(temp / 3600);
  temp -= hours * 3600;
  const minutes = Math.floor(temp / 60);
  temp -= minutes * 60;
  const seconds = temp;

  return [hours, minutes, seconds].map(formatNumber).join(':');
}

function formatNumber(n: number): string {
  return String(n).padStart(2, '0');
}

// Testing --------------------------------------------------------------------
const testCases: { name: string; act: () => boolean }[] = [
  {
    name: '0 => 00:00:00',
    act: () => {
      const input = 0;
      const expected = '00:00:00';
      const result = humanReadable(input);
      return expected === result;
    },
  },
  {
    name: '5 => 00:00:05',
    act: () => {
      const input = 5;
      const expected = '00:00:05';
      const result = humanReadable(input);
      return expected === result;
    },
  },
  {
    name: '60 => 00:01:00',
    act: () => {
      const input = 60;
      const expected = '00:01:00';
      const result = humanReadable(input);
      return expected === result;
    },
  },
  {
    name: '86399 => 23:59:59',
    act: () => {
      const input = 86399;
      const expected = '23:59:59';
      const result = humanReadable(input);
      return expected === result;
    },
  },
  {
    name: '359999 => 99:59:59',
    act: () => {
      const input = 359999;
      const expected = '99:59:59';
      const result = humanReadable(input);
      return expected === result;
    },
  },
];

const success = testCases.every(({ name, act }) => {
  if (!act()) {
    console.error(`ERROR: ${name}`);
    return false;
  }
  return true;
});

console.log(success ? 'tests passed' : 'tests failed');
