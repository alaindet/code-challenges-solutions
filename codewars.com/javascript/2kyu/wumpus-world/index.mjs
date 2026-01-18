// UNRESOLVED
// https://www.codewars.com/kata/625c70f8a071210030c8e22a/train/javascript
// node --watch index.mjs
import { wumpusWorld2 } from './wumpus-world.mjs';
import { TEST_CASES } from './test-cases.mjs';

let failedCount = 0;

for (const { name, input, expected } of TEST_CASES) {
  const result = wumpusWorld2(input);

  if (result !== expected) {
    failedCount++;
    const expectedRepr = expected ? 'true' : 'false';
    const resultRepr = result ? 'true' : 'false';
    console.log(`FAILED: ${name}: Expected ${expectedRepr}, got ${resultRepr}`);
    continue;
  }

  console.log(`PASSED: ${name}`);
}

if (failedCount > 0) {
  console.log(`--- ERROR: ${failedCount}/${TEST_CASES.length} tests failed`);
} else {
  console.log(`--- SUCCESS: all ${TEST_CASES.length} tests passed`);
}