// https://www.codewars.com/kata/54c27a33fb7da0db0100040e/train/typescript

const isSquare = (n: number): boolean => {
  let i = 0;
  while (i * i <= n) {
    i++;
  }
  i -= 1;
  return (i * i) === n;
};

export default isSquare;
