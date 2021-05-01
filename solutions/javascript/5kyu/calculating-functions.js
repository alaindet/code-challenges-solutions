// https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39/train/javascript

number_fn = n => operation => operation ? operation(n) : n;
operator_fn = (callback) => b => a => callback(a, b);

const zero = number_fn(0);
const one = number_fn(1);
const two = number_fn(2);
const three = number_fn(3);
const four = number_fn(4);
const five = number_fn(5);
const six = number_fn(6);
const seven = number_fn(7);
const eight = number_fn(8);
const nine = number_fn(9);

const plus = operator_fn((a, b) => a + b);
const minus = operator_fn((a, b) => a - b);
const times = operator_fn((a, b) => a * b);
const dividedBy = operator_fn((a, b) => Math.floor(a / b));

// ----------------------------------------------------------------------------

const test = (assertion, expected) => ({ assertion, expected });

const TESTS = [
  test(seven(times(five())), 35),
  test(zero(minus(eight())), -8),
  test(four(plus(nine())), 13),
  test(eight(minus(three())), 5),
  test(six(dividedBy(two())), 3),
  test(six(dividedBy(nine())), 0),
  test(seven(dividedBy(four())), 1),
];

for (const test in TESTS) {
  const { assertion, expected } = test;
  console.log(assertion === expected ? 'PASSED' : 'NOT PASSED');
}
