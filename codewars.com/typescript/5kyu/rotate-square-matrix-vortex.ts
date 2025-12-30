// https://www.codewars.com/kata/58d3cf477a4ea9bb2f000103/train/typescript
// node --watch rotate-square-matrix-vortex.ts # Node 24+

/**
 * This rotates a square matrix counter-clockwise "like a vortex" as per the
 * kata, meaning the outermost "ring" rotates left 90° once, the inner ring
 * rotates twice and so on.
 * 
 * The algorithm starts from the outermost ring and moves inward by an increasing
 * "offset" which starts at zero and stops when the last ring is of size 1 (for
 * matrices with an odd length) or 2 (even length).
 * 
 * @param matrix The initial square matrix
 * @returns Mutated matrix
 */
export function rotateLikeAVortex(matrix: number[][]): number[][] {
  let temp = matrix;
  let offset = 0;

  for (let ringSize = matrix.length; ringSize > 0; ringSize -= 2) {
    const spins = offset + 1;
    
    for (let spin = 0; spin < spins; spin++) {
      temp = rotateRingLeft(temp, offset);
    }

    offset++;
  }

  return temp;
}

/**
 * Rotates a "ring" counter-clockwise in a square 2D matrix of numbers
 * Mutates the original matrix for efficiency
 * Skips input validation for simplicity
 * 
 * @param matrix The initial square matrix
 * @param offset Distance from border, great distance = inner square
 * @returns Mutated matrix
 */
function rotateRingLeft(
  matrix: number[][],
  offset = 0,
): number[][] {
  const size = matrix.length;
  const ringWidth = size - offset * 2;
  const lastIndex = size - offset - 1;

  // Cannot rotate a ring of width of 1
  if (ringWidth === 1) {
    return matrix;
  }

  const top: number[] = [];
  const right: number[] = [];
  const bottom: number[] = [];
  const left: number[] = [];

  // Read lines
  for (let i = 0; i < ringWidth; i++) {

    // Read the top line of the ring (left to right)
    top.push(matrix[offset][offset + i]);

    // // Read the right line of the ring (top to bottom)
    right.push(matrix[offset + i][lastIndex]);

    // // Read the bottom line of the ring (right to left)
    bottom.push(matrix[lastIndex][lastIndex - i]);

    // // Read the left line of the ring (top to bottom)
    left.push(matrix[offset + i][offset]);
  }

  // Write lines
  for (let i = 0; i < ringWidth; i++) {

    // Write top line into left line (bottom to top)
    matrix[lastIndex - i][offset] = top[i];

    // Write right line into top line (left to right)
    matrix[offset][offset + i] = right[i];

    // Write bottom line into right line (top to bottom)
    matrix[offset + i][lastIndex] = bottom[i];

    // Write left line into bottom line (left to right)
    matrix[lastIndex][offset + i] = left[i];
  }

  return matrix;
}

const tests: Array<{ input: number[][], expected: number[][] }> = [
  {
    input: [
      [ 5, 3, 6, 1 ],
      [ 5, 8, 7, 4 ],
      [ 1, 2, 4, 3 ],
      [ 3, 1, 2, 2 ],
    ],
    expected: [
      [ 1, 4, 3, 2 ],
      [ 6, 4, 2, 2 ],
      [ 3, 7, 8, 1 ],
      [ 5, 5, 1, 3 ],
    ],
  },
  {
    input: [[2]],
    expected: [[2]],
  },
  {
    input: [
      [1, 2],
      [3, 4],
    ],
    expected: [
      [2, 4],
      [1, 3],
    ],
  },
  {
    input: [
      [ 1,  2,  3,  4,  5],
      [ 6,  7,  8,  9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ],
    expected: [
      [5, 10, 15, 20, 25],
      [4, 19, 18, 17, 24],
      [3, 14, 13, 12, 23],
      [2,  9,  8,  7, 22],
      [1,  6, 11, 16, 21],
    ],
  },
];

for (const { input, expected } of tests) {
  const result = rotateLikeAVortex(input);
  const passed = JSON.stringify(result) == JSON.stringify(expected);

  if (passed) {
    console.log('PASSED');
    continue;
  }

  console.log('ERROR');
}