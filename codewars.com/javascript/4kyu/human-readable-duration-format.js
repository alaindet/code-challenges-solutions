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

  // Edge case
  if (seconds === 0) {
    return 'now';
  }

  // Define all time units and their durations
  return [
    { label: 'year', duration: 365 * 24 * 60 * 60 },
    { label: 'day', duration: 24 * 60 * 60 },
    { label: 'hour', duration: 60 * 60 },
    { label: 'minute', duration: 60 },
    { label: 'second', duration: 1 },
  ]

  // Calculate real time units duration based on input
  .map(unit => {
    let value = Math.floor(seconds / unit.duration);
    seconds -= value * unit.duration;
    unit.duration = value;
    return unit;
  })

  // Remove unused time units
  .filter(unit => unit.duration > 0)

  // Format final string
  .reduce((result, unit, index, units) => {

    // Build this unit's string
    let pluralizer = unit.duration > 1 ? 's' : '';
    let unitString = `${unit.duration} ${unit.label}${pluralizer}`;

    // Calculate the needed glue (based on index)
    let isLast = (index === units.length - 1);
    let isSecondlast = (index === units.length - 2);
    let glue = isLast ? '' : (isSecondlast ? ' and ' : ', ');

    // Add to the final string
    return result += unitString + glue;
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
