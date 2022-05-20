/**
 * Calculates the Fibonacci sequence of Nth order and returns it
 * Naive approach, no recursion, but it's O(n) complex, so it's linear
 * 
 * @param int n Order to truncate the sequence to
 * @return array The actual Fibonacci numbers up to Nth order
 */
const fibonacciSequence = (n) => {

  // Initialize empty sequence wih string zeros
  let sequence = Array(n + 1).join('0').split('');

  // The seeds
  sequence[0] = 0;
  sequence[1] = 1;

  // Do not run the main loop on the seeds
  if (n === 0 || n === 1) {
    return [0, 1].slice(0, n + 1);
  }

  // The main loop: populate dummy values on the sequence
  for (let i = 1; i <= n; i++) {
    sequence[i+1] = sequence[i] + sequence[i-1];
  }

  return sequence;
}

/**
 * Grab the Fibonacci sequence of order N, every number is the lenght of the
 * side of a nested square. Sums all numbers together, then multiply by 4 to
 * calculate every squares' perimeter from the side length.
 * 
 * @param {*} n 
 */
const perimeter = (n) => fibonacciSequence(n).reduce((sum, i) => sum+=i, 0)*4;

// Test #1
// console.log(fibonacciSequence(0));
// console.log(fibonacciSequence(1));
// console.log(fibonacciSequence(2));
// console.log(fibonacciSequence(5));

// // Results #1
// [0]
// [0, 1]
// [0, 1, 1, 2]
// [0, 1, 1, 2, 3, 5, 8]

// Test #2
// console.log(perimeter(5)); // 80
