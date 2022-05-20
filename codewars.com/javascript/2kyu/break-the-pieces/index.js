// https://www.codewars.com/kata/527fde8d24b9309d9b000c4e/train/javascript
const breakPieces = require('./break-the-pieces');

const tests = [
  {
    arg: [
      '      +------+',
      '      |      |',
      '      |      |',
      '+-----+      |',
      '|            |',
      '+------+-----+',
      '|      |     |',
      '|      |     |',
      '+------+-----+',

      // '+------------+',
      // '|            |',
      // '|            |',
      // '|            |',
      // '+------+-----+',
      // '|      |     |',
      // '|      |     |',
      // '+------+-----+',
    ].join('\n'),
    expected: [
      // ...
    ],
  },
];

tests.forEach(test => {
  const result = breakPieces(test.arg);
  console.log(result); // TODO
});
