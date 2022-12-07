// https://www.codewars.com/kata/513e08acc600c94f01000001/train/typescript
export function rgb(r: number, g: number, b: number): string {
  return [
    toHex(to8BitDec(r)),
    toHex(to8BitDec(g)),
    toHex(to8BitDec(b)),
  ].join('');
}

function to8BitDec(dec: number): number {
  if (dec < 0) return 0;
  if (dec > 255) return 255;
  return dec;
}

function toHex(dec: number): string {
  return Number(dec).toString(16).toUpperCase().padStart(2, '0');
}

[
  { input: [0, 0, 0], expected: '000000' },
  { input: [0, 0, -20], expected: '000000' },
  { input: [300, 255, 255], expected: 'FFFFFF' },
  { input: [173, 255, 47], expected: 'ADFF2F' },
].forEach(test => {

  const { input, expected } = test;
  const [r, g, b] = input;
  const result = rgb(r, g, b);
  const passed = (result === expected);

  if (!passed) {
    console.log(`ERROR: {input: [${input.join(',')}], expected: "${expected}", got: "${result}"}`);
    return;
  }

  console.log('PASSED');
});
