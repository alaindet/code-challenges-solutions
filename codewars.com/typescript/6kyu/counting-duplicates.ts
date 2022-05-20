// https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/train/typescript

export const duplicateCount = (text: string): number => {

  const chars: string[] = text.toLowerCase().split('');
  const counts: { [key: string]: number } = {};

  for (const char of chars) {
    if (!(char in counts)) {
      counts[char] = 0;
    }
    counts[char]++;
  }

  console.log(counts);

  let result = 0;
  for (const char in counts) {
    if (counts[char] >= 2) {
      result++;
    }
  }

  return result;
};
