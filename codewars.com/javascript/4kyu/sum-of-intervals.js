const sumIntervals = (intervals) => {

  const result = [];
  let overlapping = false;

  for (let i = 0; i < intervals.length; i++) {
    
    overlapping = false;

    for (let j = 0; j < result.length; j++) {

      // Overlapping with existing one?
      if (
        (intervals[i][0] >= result[j][0] && intervals[i][0] <= result[j][1]) ||
        (intervals[i][1] >= result[j][0] && intervals[i][1] <= result[j][1])
      ) {
        overlapping = true;
        if (intervals[i][0] < result[j][0]) result[j][0] = intervals[i][0];
        if (intervals[i][1] > result[j][1]) result[j][1] = intervals[i][1];
        break;
      }
    }

    if (!overlapping) {
      result.push([intervals[i][0], intervals[i][1]]);
    }

  }

  return result.reduce((sum, interval) => {
    return sum += interval[1] - interval[0];
  }, 0);

};

// Testing
const fn = sumIntervals;
console.log(
  [
    {args: [[1, 5], [1, 5]], expected: 4},
    {args: [[1, 4], [7, 10], [3, 5]], expected: 7}
  ]
  .reduce((log, test) => {
    return log += fn(test.args) + ' => ' + test.expected + '\n';
  }, '')
);
