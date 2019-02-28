// https://www.codewars.com/kata/one-line-task-squirrel-and-tree/train/javascript

/**
 * Calculates the distance a squirrel travels to climb a tree with
 * height H and circumference S, given the squirrel climbs a height of
 * h for each loop. Result is rounded to 4th decimal digit
 * 
 * @param number h Height for a single loop 
 * @param number H Height of tree
 * @param number S Circumference of tree
 * @return number Total distance traveled
 */
squirrel=(h,H,S)=>Math.round(Math.sqrt(S*S+h*h)*H/h*10**4)/10**4;

// TESTS
const tests = [
 { a: squirrel(4, 16, 3), b: 20 },
 { a: squirrel(4, 4, 3), b: 5 },
 { a: squirrel(8, 9, 37), b: 42.5869 },
 { a: squirrel(526, 682, 140), b: 705.7435 },
 { a: squirrel(247, 857, 669), b: 2474.3392 },
 { a: squirrel(2, 11, 47), b: 258.7339 },
 { a: squirrel(73, 97, 244), b: 338.4185 },
 { a: squirrel(15, 774, 948), b: 48922.923 },
 { a: squirrel(21, 29, 60), b: 87.7856 },
 { a: squirrel(83, 97, 86), b: 139.6799 }
].reduce((log, test) => {
  return log += ((test.a === test.b) ? '' : 'not ') + `passed\n`;
}, '');

console.log(tests);
