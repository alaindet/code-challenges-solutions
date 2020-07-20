// https://www.codewars.com/kata/556deca17c58da83c00002db/train/typescript

export const tribonacci = (
  [a, b, c]: [number, number, number], n: number
): number[] => {

  if (n === 0) {
    return [];
  }

  let sequence = [a, b, c];
  let counter = 3;

  if (n <= counter) {
    return sequence.slice(0, n);
  }

  while (counter < n) {
    counter++;
    const last = sequence.length;
    const newItem = sequence[last - 3] + sequence[last - 2] + sequence[last - 1];
    sequence = [...sequence, newItem];
  }
  return sequence;
}
