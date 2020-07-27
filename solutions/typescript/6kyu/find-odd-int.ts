// https://www.codewars.com/kata/54da5a58ea159efa38000836/train/typescript


/**
 * # Description
 *
 * Given an array, find the integer that appears an odd number of times.
 * There will always be only one integer that appears an odd number of times.
 */

export const findOdd = (nums: number[]): number => {
  
  const counters: { [key: string]: number } = {};

  for (const num of nums) {
    const key = '_' + num;
    if (counters[key] === undefined) {
      counters[key] = 0;
    }
    counters[key] += 1;
  }
  
  for (const key in counters) {
    if (counters[key] % 2) {
      return +key.slice(1);
    }
  }
};

