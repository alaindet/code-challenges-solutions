// https://www.codewars.com/kata/55983863da40caa2c900004e/train/javascript

// FIRST DAY ==================================================================
// const removeDuplicates = (duplicates) => {
//   return duplicates.filter((item, i) => duplicates.indexOf(item) === i);
// };

// const permutate = (string) => {
//   const results = [];
//   const len = string.length;
//   if (len === 1) {
//     results.push(string);
//     return results;
//   }
//   for (let i = 0, ii = len; i < ii; i++) {
//     const firstChar = string[i];
//     const charsLeft = string.substring(0, i) + string.substring(i + 1);
//     const innerPermutations = permutate(charsLeft);
//     for (let j = 0, jj = innerPermutations.length; j < jj; j++) {
//       results.push(firstChar + innerPermutations[j]);
//     }
//   }
//   return results;
// }

// const nextBigger = (n) => {
//   const numberString = n.toString();
//   const numbers = removeDuplicates(permutate(numberString)).sort();
//   const index = numbers.findIndex(number => numberString === number);
//   if (index === numbers.length - 1) return -1;
//   return Number(numbers[index + 1]);
// };
// END FIRST TRY ==============================================================

const biggestNumberSameDigits = (number) => {
  const numberString = number.toString();
  const numbers = number.toString().split('');
  const descendingDigits = numbers.sort((a, b) => parseInt(b) - parseInt(a));
  return parseInt(descendingDigits.join(''));
};

const nextBigger = (number) => {
  const biggest = biggestNumberSameDigits(number);
  for (let i = number + 1; i <= biggest; i++) {
    if (biggest === biggestNumberSameDigits(i)) {
      return i;
    }
  }
  return -1;
};

// TESTS
const tests = [
  [12, 21],
  [21, -1],
  [513, 531],
  [2017, 2071],
  [414, 441],
  [144, 414]
]
.reduce((result, test) => {
  const output = nextBigger(test[0]);
  const outcome = (output === test[1]) ? 'PASSED' : 'NOT PASSED';
  result.counter += 1;
  result.log += (`
      Test #${result.counter}
      input: ${test[0]},
      output: ${output},
      assert: ${test[1]},
      outcome: ${outcome}
    `);
  return result;
}, { log: '', counter: 0 });

console.log(tests.log);
