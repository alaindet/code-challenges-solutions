/**
 * Takes an array of integers, returns an array like [ [f1, s1], [f2, s2], ... ]
 * Where f1 is a prime factor and s1 is the sum of all input integers divisible
 * by f1.
 * 
 * Ex.: sumOfDivided([12, 15]) => [ [2,12], [3,27], [5,15] ]
 * 
 * @param array list List of integers
 * @return array [ [f1, s1], [f2, s2], ... ] (See description)
 */
const sumOfDivided = (list) => {

  // Get maximum absolute value from list
  const sup = Math.max(...list.map(Math.abs));

  // Define containers
  let primeFactors = [];
  let result = [];

  for (let factor = 2; factor <= sup; factor++) {
    
    // Check if the current factor is a prime factor
    // (It cannot be divided by any previous prime factor)
    if (primeFactors.every(primeFactor => factor % primeFactor !== 0)) {

      // Select all input numbers divisible by this factor
      let numbers = list.filter(number => number % factor === 0);

      // Sum all divisible input numbers and populate the results
      if (numbers.length) {
        let sum = numbers.reduce((sum, number) =>  sum += number, 0);
        primeFactors.push(factor);
        result.push([factor, sum]);
      }
    }
  }

  return result;
};

// Testing
const arrayToString = (array) => {
  return '['+array.reduce((result, value, index, items) => {
    let item = value instanceof Array ? arrayToString(value) : value;
    let glue = (index === items.length - 1) ? '' : ', ';
    return result += item + glue;
  }, '')+']';
};

console.log(
  [
    // Test #1
    {
      arguments: [12, 15],
      assertion: [
        [2, 12],
        [3, 27],
        [5, 15]
      ]
    },
    // Test #2
    {
      arguments: [15, 21, 24, 30, 45],
      assertion: [
        [2, 54],
        [3, 135],
        [5, 90],
        [7, 21]
      ]
    },
    // Test #3
    {
      arguments: [-29804, -4209, -28265, -72769, -31744],
      assertion: [
        [2, -61548],
        [3, -4209],
        [5, -28265],
        [23, -4209],
        [31, -31744],
        [53, -72769],
        [61, -4209],
        [1373, -72769],
        [5653, -28265],
        [7451, -29804]
      ]
    }
  ].reduce((log, test) => {
    let result = arrayToString(sumOfDivided(test.arguments));
    let assertion = arrayToString(test.assertion);
    let outcome = (result === assertion ? '' : 'not ')+'passed';
    return log += `args: ${test.arguments}\ntest: ${outcome}\n\n`;
  }, '')
);
