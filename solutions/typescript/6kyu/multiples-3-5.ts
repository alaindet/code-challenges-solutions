// https://www.codewars.com/kata/514b92a657cdc65150000006/train/typescript

export class Challenge {
  static solution(n: number): number {

    let result = 0;

    for (let i = 0; i < n; i++) {
      if (i % 3 == 0 || i % 5 == 0) {
        result += i;
      }
    }

    return result;
  }
}

/**
 * Alternative 1
 */
const divisibleBy = (...dividends: number[]): (n: number) => boolean => {
  return n => dividends.some(d => n % d == 0)
};

const range = (n: number): number[] => {
  const range = [];
  for (let i = 0; i < n; i++) {
    range.push(i)
  }
  return range;
};

const sum = (nums: number[]): number => nums.reduce((tot, i) => tot += i, 0);

const solution = (n: number): number => sum(range(n).filter(divisibleBy(3, 5)));