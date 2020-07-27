// https://www.codewars.com/kata/5526fc09a1bbd946250002dc/train/typescript

const isOdd = (n: number): boolean => n % 2 === 1;
const isEven = (n: number): boolean => n % 2 === 0;

export const findOutlier = (nums: number[]): number => {
  
  let [odds, evens] = [0, 0];
  
  for (const num of nums.slice(0, 3)) {
    if (isOdd(num)) odds += 1;
    if (isEven(num)) evens += 1;
  }
  
  const isSequenceOdd = odds > evens;
  const isSequenceEven = evens > odds;
  
  for (const num of nums) {
    if ( (isSequenceOdd && isEven(num)) || (isSequenceEven && isOdd(num)) ) {
      return num;
    }
  }
  
  return 0;
};
