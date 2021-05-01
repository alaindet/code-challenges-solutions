// https://www.codewars.com/kata/540d0fdd3b6532e5c3000b5b/train/javascript

function expand(expr) {
  const terms = [];
  const { coeff1, coeff2, symbol, exp } = parseExpression(expr);

  if (exp === 0) {
    return '1';
  }

  for (let i = 0; i <= exp; i++) {
    const reverseIndex = exp - i;
    const binCoeff = binomialCoefficient(exp, i);
    const coeff = binCoeff * (coeff1 ** reverseIndex) * (coeff2 ** i);
    if (coeff == 0) {
      continue;
    }
    const term = renderTerm(coeff, symbol, reverseIndex, exp);
    terms.push(term);
  }

  return terms.join('');
}

function renderTerm(coeff, symbol, exp, maxExp) {
  const isFirst = (exp === maxExp);
  const isSecondToLast = (exp === 1);
  const isLast = (exp === 0);
  const absCoeff = Math.abs(coeff);
  const _operator_ = (coeff < 0) ? '-' : (!isFirst ? '+' : '');
  const _coeff_ = (absCoeff === 1 && !isLast) ? '' : absCoeff;
  const _power_ = isLast ? '' : (isSecondToLast ? symbol : `${symbol}^${exp}`);
  return `${_operator_}${_coeff_}${_power_}`;
}

function binomialCoefficient(n, k) {

  if (k === 0 || k === n) {
    return 1;
  }

  let numerator = n;
  let numerator_multiplier = n - 1;

  while (numerator_multiplier > (n - k)) {
    numerator *= numerator_multiplier;
    numerator_multiplier--;
  }

  let denominator = k;
  let denominator_multiplier = k - 1;

  while (denominator_multiplier > 1) {
    denominator *= denominator_multiplier;
    denominator_multiplier--;
  }

  return numerator / denominator;
}

function parseExpression(expr) {
  const regex = /^\((\+\d+|\+|\-|\-\d+|\d+|)([a-z])(\+\d+|\-\d+)\)\^(\d+)$/;
  matches = expr.match(regex);
  return {
    coeff1: parseFirstCoefficient(matches[1]),
    coeff2: +matches[3],
    symbol: matches[2],
    exp: +matches[4],
  };
}

function parseFirstCoefficient(coeff) {
  switch (coeff) {
    case '+':
    case '':
      return 1;
    case '-':
      return -1;
    default:
      return coeff * 1;
  }
}

// ----------------------------------------------------------------------------

const test = (assertion, expected) => ({ assertion, expected });

const TESTS = [
  test(expand('(-12c+1)^1'), '-12c+1'),
  test(expand('(x-1)^2'), 'x^2-2x+1'),
  test(expand('(x+1)^0'), '1'),
  test(expand('(x+1)^1'), 'x+1'),
  test(expand('(x+1)^2'), 'x^2+2x+1'),
  test(expand('(x-1)^0'), '1'),
  test(expand('(x-1)^1'), 'x-1'),
  test(expand('(x-1)^2'), 'x^2-2x+1'),
  test(expand('(5m+3)^4'), '625m^4+1500m^3+1350m^2+540m+81'),
  test(expand('(2x-3)^3'), '8x^3-36x^2+54x-27'),
  test(expand('(7x-7)^0'), '1'),
  test(expand('(-5m+3)^4'), '625m^4-1500m^3+1350m^2-540m+81'),
  test(expand('(-2k-3)^3'), '-8k^3-36k^2-54k-27'),
  test(expand('(-7x-7)^0'), '1'),
  test(expand('(-n-12)^5'), '-n^5-60n^4-1440n^3-17280n^2-103680n-248832'),
  test(expand('(-k+4)^7'), '-k^7+28k^6-336k^5+2240k^4-8960k^3+21504k^2-28672k+16384'),
];

for (const test of TESTS) {
  const { assertion, expected } = test;
  console.log(assertion === expected ? 'PASSED' : 'NOT PASSED');
}
