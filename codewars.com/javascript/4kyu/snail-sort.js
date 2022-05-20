// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript

const GAME = {
  directions: [ // Clock-wise
    [+0, +1], // Right
    [+1, +0], // Down
    [+0, -1], // Left
    [-1, +0]  // Up
  ],
  current: {},
  aux: {}
};

const buildBooleanMap = (dimension) => {
  const grid = [];
  const line = [];
  for (let i = 0; i < dimension; i++) line.push(true);
  for (let i = 0; i < dimension; i++) grid.push([...line]);
  return grid;
};

const calculateNextPosition = () => {
  GAME.aux.nextPosition = [
    GAME.current.position[0] + GAME.current.direction[0],
    GAME.current.position[1] + GAME.current.direction[1]
  ];
  return GAME.aux.nextPosition;
};

const isPosition = (pos) => {
  if (GAME.map[pos[0]] === undefined) return false;
  if (GAME.map[pos[0]][pos[1]] === undefined) return false;
  if (GAME.map[pos[0]][pos[1]] === false) return false;
  return true;
};

const changeDirection = () => {
  GAME.current.directionJustChanged = true;
  GAME.current.directionIndex++;
  if (GAME.current.directionIndex >= GAME.aux.directionsCount) {
    GAME.current.directionIndex -= GAME.aux.directionsCount;
  }
  GAME.current.direction = GAME.directions[GAME.current.directionIndex];
};

const changePosition = () => {
  const x = GAME.aux.nextPosition[0];
  const y = GAME.aux.nextPosition[1];
  GAME.current.position = [x, y];
  GAME.map[x][y] = false;
  GAME.result.push(GAME.values[x][y]);
  GAME.current.directionJustChanged = false;
};

/**
 * Starts from top left corner, proceeds clock-wise (CW)
 * X is vertical and positive going down
 * Y is horizontal and positive going right
 * 
 * @param values array The 2D map of values
 * @return array The "snail" sequence of values, starting from top left cw
 */
const snail = (values) => {

  // ERROR: Empty map
  if (values[0].length === 0) return [];

  // Initialize
  GAME.values = values;
  GAME.dimension = values.length;
  GAME.map = buildBooleanMap(GAME.dimension);
  GAME.map[0][0] = false;
  GAME.aux.directionsCount = GAME.directions.length;
  GAME.current.directionIndex = 0;
  GAME.current.direction = GAME.directions[GAME.current.directionIndex];
  GAME.current.position = [0, 0];
  GAME.current.directionJustChanged = false;
  GAME.result = [values[0][0]];

  // Move
  while (1) {
    if (!isPosition(calculateNextPosition())) {
      if (GAME.current.directionJustChanged) break;
      changeDirection();
      continue;
    }
    changePosition();
  }

  return GAME.result;

};

// TESTS
const compareArrays = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0, len = a.length; i < len; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const tests = [
  [
    [ // 4x4
      [1,2,3,1],
      [4,5,6,4],
      [7,8,9,7],
      [7,8,9,7]
    ],
    [1,2,3,1,4,7,7,9,8,7,7,4,5,6,9,8]
  ],
  [
    [ // 5x5
      [0,1,2,3,4],
      [5,6,7,8,5],
      [4,3,4,9,6],
      [3,2,1,0,7],
      [2,1,0,9,8]
    ],
    [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4]
  ]
]
// .map(test => console.log(snail(test[0])));
.reduce((result, test) => {
  const output = snail(test[0]);
  const outcome = compareArrays(output, test[1]) ? 'PASSED' : 'NOT PASSED';
  result.counter += 1;
  result.log += (`
    Test #${result.counter}
    output: ${output},
    assert: ${test[1]},
    outcome: ${outcome}
  `);
  return result;
}, { log: '', counter: 0 });

console.log(tests.log);
