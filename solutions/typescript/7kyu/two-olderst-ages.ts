// https://www.codewars.com/kata/511f11d355fe575d2c000001/train/typescript

/*
 * The two oldest ages function/method needs to be completed. It should take an
 * array of numbers as its argument and return the two highest numbers within
 * the array. The returned value should be an array in the format [second oldest 
 * age, oldest age].
 * 
 * The order of the numbers passed in could be any order. The array will always
 * include at least 2 items.
 * 
 * For example:
 * twoOldestAges([1, 5, 87, 45, 8, 8]) // should return [45, 87]
*/

export const twoOldestAges = (ages: number[]): number[] => {
  const comparer = (a: number, b: number): number => a - b;
  const sortedAges = [...ages].sort(comparer);
  return sortedAges.slice(-2);
};
