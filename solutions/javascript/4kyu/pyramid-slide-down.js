// https://www.codewars.com/kata/551f23362ff852e2ab000037/train/javascript

const longestSlideDown = (pyramid) => {
  for (let i = pyramid.length - 1; i > 0; i--) {
    const row = pyramid[i];
    const newRow = [];
    for (let j = 0, jj = row.length - 1; j < jj; j++) {
      const left = row[j];
      const right = row[j + 1];
      const max = (left > right) ? left : right;
      newRow.push(max + pyramid[i - 1][j]);
    }
    pyramid[i - 1] = newRow;
  }
  return pyramid[0][0];
};

// ==== TEST ==================================================================
const testFunc = longestSlidedown;
const tests = [

  // Test #1
  {
    input: [
      [3],
      [7, 4],
      [2, 4, 6],
      [8, 5, 9, 3]
    ],
    expected: 23
  },

  // Test #2
  {
    input: [
      [75],
      [95, 64],
      [17, 47, 82],
      [18, 35, 87, 10],
      [20, 4, 82, 47, 65],
      [19, 1, 23, 75, 3, 34],
      [88, 2, 77, 73, 7, 63, 67],
      [99, 65, 4, 28, 6, 16, 70, 92],
      [41, 41, 26, 56, 83, 40, 80, 70, 33],
      [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
      [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
      [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
      [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
      [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
      [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23]
    ],
    expected: 1074
  }

];

console.log(
  tests.map((test, index) => {

    const asserted = testFunc(test.input);
    const expected = test.expected;

    if (asserted !== expected) {
      return [
        '',
        `${index + 1}) NOT PASSED`,
        'Expected',
        expected,
        'Asserted',
        asserted,
        ''
      ].join('\n');
    }

    return `${index + 1}) PASSED`;

  }).join('\n')
);
