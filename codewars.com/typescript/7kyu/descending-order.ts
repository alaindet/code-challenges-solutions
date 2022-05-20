// https://www.codewars.com/kata/5467e4d82edf8bbf40000155/train/typescript

/*
Your task is to make a function that can take any non-negative integer as a argument and return it with its digits in descending order. Essentially, rearrange the digits to create the highest possible number.

Examples:
Input: 42145 Output: 54421

Input: 145263 Output: 654321

Input: 123456789 Output: 987654321
*/

export const descendingOrder = (n: number): number => {
  const digits = ('' + n).split('');
  digits.sort((a: string, b: string): number => (+b) - (+a));
  return +digits.join('');
};
