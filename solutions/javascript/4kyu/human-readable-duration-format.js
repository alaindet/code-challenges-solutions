/**
 * This function takes a number of seconds and prints it in a
 * human-readable string format
 * 
 * Ex.: 3662 => '1 hour, 1 minute and 2 seconds'
 * 
 * Found at:
 * https://www.codewars.com/kata/52742f58faf5485cae000b9a/train/javascript
 * 
 * @param integer seconds
 * @return string
 */
const formatDuration = (seconds) => {

  if (seconds === 0) {
    return 'now';
  }

  return [
    { label: 'year', duration: 365 * 24 * 60 * 60 },
    { label: 'day', duration: 24 * 60 * 60 },
    { label: 'hour', duration: 60 * 60 },
    { label: 'minute', duration: 60 },
    { label: 'second', duration: 1 },
  ]
  .map(unit => {
    let value = Math.floor(seconds / unit.duration);
    seconds -= value * unit.duration;
    unit.duration = value;
    return unit;
  })
  .filter(unit => unit.duration > 0)
  .map((unit) => {
    return `${unit.duration} ${unit.label}` + (unit.duration > 1 ? "s" : "");
  })
  .reduce((result, unit, i, units) => {
    let last = i === units.length - 1;
    let penultimate = i === units.length - 2;
    return result += unit + (last ? '' : (penultimate ? ' and ' : ', '));
  }, '');
};

// Testing
const test = (test, assert) => (test === assert ? '' : 'not ')+'passed';

console.log([
  test(formatDuration(1), '1 second'),
  test(formatDuration(62), '1 minute and 2 seconds'),
  test(formatDuration(120), '2 minutes'),
  test(formatDuration(3600), '1 hour'),
  test(formatDuration(3662), '1 hour, 1 minute and 2 seconds')
].join('\n'));
