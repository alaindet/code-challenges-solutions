// https://www.codewars.com/kata/581bc0629ad9ff9873000316/train/javascript

/**
 * Define all possible operations (symbol => function)
 */
const OPERATIONS = {
  '$': (a, b) => a / b,
  '*': (a, b) => a * b,
  '#': (a, b) => a - b,
  '+': (a, b) => a + b
};

/**
 * Parses the sequence as an object with the following two props
 * - sequence
 *     The parsed sequence, where there's a perfect alternation of numbers
 *     and operations, starting and ending with numbers.
 *     Numbers are cast via Number(), operations are single character symbols
 * - operations
 *     A map which associates an operation symbol to the amount of needed
 *     calculations to exhaus all same operations
 *
 * Ex.:
 * input = '1+1' 
 * result = {
 *   sequence: [1, '+', 1],
 *   operations: { '$':0, '*':0, '#':0, '+':1 }
 * }
 * 
 * @param input string
 * @return object
 */
const parseSequence = (input) => {

  // Temporary variable used to build a numerical group (Ex.: -123.456)
  let currentNumber = '';

  return input.split('').reduce(

    // Reducer
    (result, symbol, index, sequence) => {

      // Numerical symbol
      if (symbol.match(/[0-9\.\-]/)) {
        currentNumber += symbol;
        if (index === sequence.length - 1) {
          result.sequence.push(Number(currentNumber));
        }
      }
      
      // Operation symbol
      else {
        result.sequence.push(Number(currentNumber));
        result.sequence.push(symbol);
        result.operations[symbol]++;
        currentNumber = '';
      }

      return result;

    },

    // State
    {
      sequence: [],
      operations: Object.keys(OPERATIONS).reduce(
        (result, operation) => {
          result[operation] = 0;
          return result;
        },
        {}
      )
    }

  );

};

/**
 * Accepts a sequence of operations as a string and returns the result as number
 * or an error message as a string
 * 
 * @param number|string input Calculation result or error message
 */
const calculate = (input) => {

  // Change all non-ambiguous - to _ for subtraction to avoid later conflicts
  input = input.replace(/(?<!^|\$|\*)\-/g, '#');

  // Combine all bad request conditions into one regex Ex.: (foo|bar|baz)
  const badRequest = new RegExp('('+[
    '^[\\$\\*\\#\\+]', // Starts with any operator
    '[\\$\\*\\#\\+]$', // Ends with any operator
    '[\\$\\*\\#\\+]{2,}', // Has two or more adjacent operators
    '[^\\$\\*\\#\\+0-9\.\-]' // Has any character except numbers and operators
  ].join('|')+')', 'g');

  // ERROR: A bad request was passed
  if (input.match(badRequest)) return '400: Bad request';

  // Parse the input sequence. This will split the sequence and count operations
  const state = parseSequence(input);

  // Loop on all operations to do
  Object.entries(state.operations).forEach(operationSet => {

    // Read current operation info
    const symbol = operationSet[0];
    let amount = operationSet[1];
    const operation = OPERATIONS[symbol];

    // Perform all same operations from left to right
    while (amount--) {

      // Check where the next operation is
      const index = state.sequence.findIndex(bit => bit === symbol);

      // Read sequence
      const left = state.sequence.slice(0, index - 1);
      const operand1 = state.sequence[index - 1];
      const operand2 = state.sequence[index + 1];
      const right = state.sequence.slice(index + 2);

      // Calculate new value
      const newValue = operation(operand1, operand2);

      // Update sequence
      // BEFORE: [ ...left, operand1, operator, operand2, ...right ]
      // AFTER: [...left, newValue, ...right]
      state.sequence = [...left, newValue, ...right];

    }

  });

  const result = state.sequence[0];

  return result;

};

// TESTS
const tests = [
  ['1', 1],
  ['1.1', 1.1],
  ['1+1', 2],
  ['1-1', 0],
  ['2$2', 1],
  ['2*2', 4],
  ['1.1+1.9', 3],
  ['9$4', 2.25],
  ['1.5*3', 4.5],
  ['5-43.2', -38.2],
  ['1+2+3+4', 10],
  ['5+5+5+5', 20],
  ['5-5-5-5', -10],
  ['5*5*5*5', 625],
  ['5$5$5$5', 0.04],
  ['1+1-1', 1],
  ['5*6$2+5-10', 10],
  ['1*1*1*1*1*1$1$1$1$1+1-1+9-1', 9],
  ['1000$2.5$5+5-5+6$6', 81],
  ['5*6$2&5-10', '400: Bad request'],
  ['5/10', '400: Bad request'],
  ['p', '400: Bad request'],
  ['9^9', '400: Bad request']
].reduce((result, test) => {
  const output = calculate(test[0]);
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
}, {log: '', counter: 0});

console.log(tests.log);
