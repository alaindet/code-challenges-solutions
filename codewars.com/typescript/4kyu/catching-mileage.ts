// https://www.codewars.com/kata/52c4dd683bfd3b434c000292/train/typescript
// nodemon -x npx ts-node ./catching-mileage -w ./catching-mileage.ts

const INTERESTING_NUMBER = {
  NO: 0,
  CLOSE: 1,
  YES: 2,
} as const;

type EnumLike<T> = T[keyof T];
type InterestingNumber = EnumLike<typeof INTERESTING_NUMBER>;

export function isInteresting(n: number, awesomePhrases: number[]): InterestingNumber {

  if (isActuallyInteresting(n, awesomePhrases)) {
    return INTERESTING_NUMBER.YES;
  }

  for (const next of [n + 1, n + 2]) {
    if (isActuallyInteresting(next, awesomePhrases)) {
      return INTERESTING_NUMBER.CLOSE;
    }
  }

  return INTERESTING_NUMBER.NO;
}

function isActuallyInteresting(n: number, awesomePhrases: number[]): boolean {
  const digits = splitDigits(n);

  if (digits.length === 1) {
    return false;
  }

  return (
    isOneDigitAndAllZeros(digits) ||
    areDigitsEqual(digits) ||
    areDigitsSequentialAndAscending(digits) ||
    areDigitsSequentialAndDescending(digits) ||
    areDigitsPalindrome(digits) ||
    numberMatchedAwesomePhrases(n, awesomePhrases)
  );
}

function splitDigits(n: number): number[] {
  return `${n}`.split('').map(Number);
}

function isOneDigitAndAllZeros(digits: number[]): boolean {
  return digits[0] !== 0 && digits.slice(1).every(d => d === 0);
}

function areDigitsEqual(digits: number[]): boolean {
  let theDigit = digits[0];
  return digits.every(d => d === theDigit);
}

// Reference sequence is 1234567890
function areDigitsSequentialAndAscending(digits: number[]): boolean {

  let [theDigit, ...otherDigits] = digits;

  for (let i = 0; i < otherDigits.length; i++) {
    const digit = otherDigits[i];

    // Handle zero
    if (digit === 0) {
      const isLast = i === otherDigits.length - 1;
      if (theDigit !== 9 || !isLast) {
        return false;
      }
      continue;
    }

    if (digit !== theDigit + 1) {
      return false;
    }

    theDigit = digit;
  }

  return true;
}

// Reference sequence is 9876543210
function areDigitsSequentialAndDescending(digits: number[]): boolean {

  let [theDigit, ...otherDigits] = digits;

  for (let i = 0; i < otherDigits.length; i++) {
    const digit = otherDigits[i];

    // Handle zero
    if (digit === 0 && i !== digits.length - 1) {
      return false;
    }

    if (digit !== theDigit - 1) {
      return false;
    }

    theDigit = digit;
  }

  return true;
}

function areDigitsPalindrome(digits: number[]): boolean {

  const iterations = Math.ceil(digits.length / 2);
  let [left, right] = [0, digits.length - 1];

  for (let i = 0; i < iterations; i++) {

    // Stop if reached and/or crossed the center
    if (left === right || left > right) {
      break;
    }

    if (digits[left] !== digits[right]) {
      return false;
    }

    left += 1;
    right -= 1;
  }

  return true;
}

function numberMatchedAwesomePhrases(n: number, phrases: number[]): boolean {
  return phrases.some(p => p === n);
}

// Testing --------------------------------------------------------------------
const testCases: {
  name: string;
  input: [number, number[]];
  expected: number;
}[] = [
  {
    name: 'Digit with zeros',
    input: [4000, []],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: 'All digits are born equal',
    input: [99999999999, []],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: 'Increasing sequential digits',
    input: [67890, []],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: 'Decreasing sequential digits',
    input: [456, []],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: 'Wow, a rotator kayak!',
    input: [113454311, []],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: 'I see deed peep at noon',
    input: [4455665544, []],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: '53550',
    input: [53550, [53550]],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: 'An awesome number',
    input: [1337, [1337, 256]],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: 'tooth without h',
    input: [11211, [1337, 256]],
    expected: INTERESTING_NUMBER.YES,
  },
  {
    name: 'Close to 53550',
    input: [53548, [53550]],
    expected: INTERESTING_NUMBER.CLOSE,
  },
  {
    name: 'Close #1',
    input: [1336, [1337, 256]],
    expected: INTERESTING_NUMBER.CLOSE,
  },
  {
    name: 'Close #2',
    input: [11209, [1337, 256]],
    expected: INTERESTING_NUMBER.CLOSE,
  },
  {
    name: 'No #1',
    input: [3, [1337, 256]],
    expected: INTERESTING_NUMBER.NO,
  },
  {
    name: 'No #2',
    input: [11208, [1337, 256]],
    expected: INTERESTING_NUMBER.NO,
  },
];

const success = testCases.every(({ name, input, expected }) => {
  const [n, phrases] = input;
  const result = isInteresting(n, phrases);
  if (result !== expected) {
    console.error(`ERROR: ${name} - Got ${result} instead of ${expected}`);
    return false;
  }
  return true;
});

console.log(success ? 'tests passed' : 'tests failed');
