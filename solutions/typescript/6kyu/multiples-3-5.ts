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
const divisibleBy = (...d: number[]): (n: number) => boolean => n => d.some(i => n % i == 0);
const range = (n: number): number[] => [...Array(n).keys()];
const sum = (nums: number[]): number => nums.reduce((tot, i) => tot += i, 0);
const solution = (n: number): number => sum(range(n).filter(divisibleBy(3, 5)));