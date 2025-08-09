// https://www.codewars.com/kata/55695bc4f75bbaea5100016b/train/typescript
export function *fibonacciSequence(maxIterations: number): Generator<bigint> {

  let [a, b] = [1n, 1n];

  for (let i = 0; i < maxIterations; i++) {
    if (i === 0) {
      yield a;
      continue;
    }

    if (i === 1) {
      yield b;
      continue;
    }

    const next = a + b;
    a = b;
    b = next;
    yield next;
  }
}

(() => {
  for (const n of fibonacciSequence(15)) {
    console.log(n);
  }
})();