/**
 * Recursive function to calculate factorial of an integer N, which is a fancy
 * term for a chain of multiplications like N! = N*(N-1)*(N-2)*...*1
 * 
 * Ex.:
 * factorial(3) = 3*2*1 = 6
 * factorial(7) = 7*6*5*4*3*2*1 = 5040
 * factorial(0) = 1 by convention so that there's an escape button
 * 
 * @param int n
 */
const factorial = (n) => {
  return n !== 0 ? n * factorial(n - 1) : 1;
}

/**
 * Calculates the binomial coefficient in a less computation-intensive way
 * https://en.wikipedia.org/wiki/Binomial_coefficient
 * 
 * Instead of the formal factorial(n) / ( factorial(n-k) * factorial(k) ),
 * I combine factorial(n) / factorial(n-k) into a simpler numerator like
 * n*(n-1)*...*(n-k+1), which avoids two factorials just to divide them later.
 * 
 * Useless optimization for small N and K, becomes paramount on bigger ones
 * 
 * @param int n
 * @param int k 
 */
const binomialCoefficient = (n, k) => {
  let numerator = 1;

  for (let i = 0; i < k; i++) {
    numerator *= n - i;
  }

  return numerator / factorial(k);
};

/**
 * Returns the Nth row of the Pascal's Triangle
 * 
 * Just stick to the binomial coefficient formula,
 * So the element on Nth row and Kth column of the Pascal's Triangle has
 * value = binomialCoefficient(n,k)
 * 
 * @param int n The 0-based row number of the Pascal's Triangle line you need
 */
const pascalsTriangleRow = (n) => {
  let numbers = [];
  const columns = n + 1;

  for (let i = 0; i < columns; i++) {
    // Math.round() is needed since bigger N produces floats
    // like 42503.99999999999 instead of 42504
    numbers.push(Math.round(binomialCoefficient(n, i)));
  }

  return numbers;
};

/**
 * Builds a range of integers of length N, like [0, ..., N-1]
 * @param int n
 */
const range = (n) => {

  // Readable way
  let range = [];
  for (let i = 0; i < n; i++) {
    range.push(i);
  }

  // Shorter and more exotic way
  // const range = [...Array(n).keys()];

  return range;
}

/**
 * Calculates Pascal's Triangle rows and glues them together up to given depth
 * 
 * @param int n Depth of iteration
 */
const pascalsTriangle = (n) => {

  return range(n) // Build range [0, ..., N-1]
    .map(pascalsTriangleRow) // Calculate all rows
    .reduce((triangle, row) => triangle.concat(row), []); // Glue them together
}

// Testing
// console.log(range(6).map(pascalsTriangle));

// Results
// =======
// [
//   [],
//   [1],
//   [1, 1, 1],
//   [1, 1, 1, 1, 2, 1],
//   [1, 1, 1, 1, 2, 1, 1, 3, 3, 1],
//   [1, 1, 1, 1, 2, 1, 1, 3, 3, 1, 1, 4, 6, 4, 1]
// ]
