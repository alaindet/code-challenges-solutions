// https://www.codewars.com/kata/56c04261c3fcf33f2d000534
const doubles = (maxk, maxn) => {
  let sum = 0;
  for (let k = 1; k <= maxk; k++) {
    for (let n = 1; n <= maxn; n++) {
      sum += 1 / (k * Math.pow(n + 1, 2 * k));
    }
  }
  return sum;
};

// Testing
const fuzzyEqual = (a, b, decimals) => {
  a = Number(a.toFixed(decimals));
  b = Number(b.toFixed(decimals));
  return a === b;
};

console.log(
  [
    [doubles(1, 10), 0.5580321939764581],
    [doubles(10, 1000), 0.6921486500921933],
    [doubles(10, 10000), 0.6930471674194457],
    [doubles(20, 10000), 0.6930471955575918]
  ].reduce((log, test) => {
    const outcome = (fuzzyEqual(test[0], test[1], 10) ? '' : 'not ')+'passed';
    return log += `${test[0]} ~= ${test[1]} => ${outcome}\n`;
  }, '')
);
