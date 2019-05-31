/**
 * Conway's Game of Life - Unlimited Edition
 * https://www.codewars.com/kata/52423db9add6f6fc39000354/train/javascript
 * 
 * Description
 * ===========
 * Given a 2D array and a number of generations, compute n timesteps of
 * Conway's Game of Life
 * 
 * - Any live cell with fewer than two live neighbours dies, as if caused by
 *   underpopulation
 * - Any live cell with more than three live neighbours dies, as if by
 *   overcrowding
 * - Any live cell with two or three live neighbours lives on to the next
 *   generation
 * - Any dead cell with exactly three live neighbours becomes a live cell
 * 
 * Each cell's neighborhood is the 8 cells immediately around it (i.e. Moore
 * Neighborhood). The universe is infinite in both the x and y dimensions and
 * all cells are initially dead - except for those specified in the arguments.
 * 
 * The return value should be a 2d array cropped around all of the living cells.
 * (If there are no living cells, then return [[]].)
 * 
 * For illustration purposes, 0 and 1 will be represented as ░░ and ▓▓ blocks
 * respectively (PHP, C: plain black and white squares).
 * You can take advantage of the htmlize function to get a text representation
 * of the universe
 * 
 * Ex.:
 * ```console.log(htmlize(cells));```
 */
const ALIVE = 1;
const DEAD = 0;

const MOVES = {
  tl: [-1, -1],
  t:  [-1,  0],
  tr: [-1,  1],
  r:  [ 0,  1],
  br: [ 1,  1],
  b:  [ 1,  0],
  bl: [ 1, -1],
  l:  [ 0, -1]
};

const POSITIONS = {
  tl: [MOVES.r, MOVES.br, MOVES.b],
  t:  [MOVES.r, MOVES.br, MOVES.b, MOVES.bl, MOVES.l],
  tr: [MOVES.b, MOVES.bl, MOVES.l],
  r:  [MOVES.b, MOVES.bl, MOVES.l, MOVES.tl, MOVES.t],
  br: [MOVES.tl, MOVES.t, MOVES.l],
  b:  [MOVES.tl, MOVES.t, MOVES.tr, MOVES.r, MOVES.l],
  bl: [MOVES.t, MOVES.tr, MOVES.r],
  l:  [MOVES.t, MOVES.tr, MOVES.r, MOVES.br, MOVES.b],
  middle: [
    MOVES.tl, MOVES.t, MOVES.tr, MOVES.r, MOVES.br, MOVES.b, MOVES.bl, MOVES.l
  ]
};

const trimGrid = (grid) => {

  // ERROR: Empty grid
  const firstRow = grid[0];
  if (firstRow === undefined) {
    return [[]];
  }

  const rowsCount = grid.length;
  const colsCount = firstRow.length;

  let firstAlive = false;
  let [topRow, bottomRow, leftCol, rightCol] = [0, 0, 0, 0];

  // Calculate grid limits
  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < colsCount; j++) {
      const cell = grid[i][j];
      if (cell) {
        if (!firstAlive) {
          firstAlive = true;
          [topRow, bottomRow, leftCol, rightCol] = [i, i, j, j];
          continue;
        }
        if (i > bottomRow) bottomRow = i;
        if (j < leftCol) leftCol = j;
        if (j > rightCol) rightCol = j;
      }
    }
  }

  return grid
    .slice(topRow, bottomRow + 1) // Remove rows
    .map(row => row.slice(leftCol, rightCol + 1)); // Remove columns
};

const getExtraLine = (line, debugging) => {
  const extraLine = [];
  let shuouldAddExtraLine = false;
  for (let i = 1, len = line.length - 2; i <= len; i++) {
    if (line[i-1] && line[i] && line[i+1]) {
      shuouldAddExtraLine = true;
      extraLine.push(ALIVE);
    } else {
      extraLine.push(DEAD);
    }
  }

  if (debugging) {
    console.log(extraLine);
    console.log([DEAD, ...extraLine, DEAD]);
    throw 'debug';
  }

  return (shuouldAddExtraLine) ? [DEAD, ...extraLine, DEAD] : null;
};

const getNextGeneration = (grid) => {

  let nextGrid = [];
  const rowsCount = grid.length;
  const colsCount = grid[0].length;
  const extraLines = {};

  for (let row = 0; row < rowsCount; row++) {

    const nextRow = [];
    let isRow = false;

    for (let col = 0; col < colsCount; col++) {

      let position = '';
      if (grid[row - 1] === undefined) position += 't';
      if (grid[row + 1] === undefined) position += 'b';
      if (grid[row][col - 1] === undefined) position += 'l';
      if (grid[row][col + 1] === undefined) position += 'r';
      if (position === '') position = 'middle';

      let neighbours = 0;
      POSITIONS[position].forEach(move => {
        if (grid[ row+move[0] ][ col+move[1] ]) {
          neighbours++;
        }
      });

      const isAlive = grid[row][col];

      if (neighbours === 3 || (isAlive && neighbours === 2)) {
        isRow = true;
        nextRow.push(ALIVE);
      } else {
        nextRow.push(DEAD);
      }
    }

    if (isRow) {
      nextGrid.push(nextRow);
    }
  }

  // Add top row?
  const newTop = getExtraLine(grid[0]);
  if (newTop) {
    extraLines.newTop = true;
    nextGrid.unshift(newTop);
  }

  // Add bottom row?
  const newBottom = getExtraLine(grid[rowsCount - 1]);
  if (newBottom) {
    extraLines.newBottom = true;
    nextGrid.push(newBottom);
  }

  // Function to extract a column by index
  const extractCol = (index) => {
    const col = [];
    grid.forEach(row => col.push(row[index]));
    return col;
  };

  // Add left column?
  let newLeft = getExtraLine(extractCol(0));
  if (newLeft) {
    if (extraLines.newTop) newLeft = [0, ...newLeft];
    if (extraLines.newBottom) newLeft = [...newLeft, 0];
    nextGrid = nextGrid.map((row, index) => [newLeft[index], ...row]);
  }

  // Add right column?
  let newRight = getExtraLine(extractCol(colsCount - 1));
  if (newRight) {
    if (extraLines.newTop) newRight = [0, ...newRight];
    if (extraLines.newBottom) newRight = [...newRight, 0];
    nextGrid = nextGrid.map((row, index) => [...row, newRight[index]]);
  }

  return trimGrid(nextGrid);
};

const getGeneration = (grid, generations) => {
  while (generations--) {
    grid = getNextGeneration(grid);
  }
  return grid;
};

// Tests ----------------------------------------------------------------------
const testShowRow = (row, alive = 'x', dead = ' ', colSeparator = '|') => {
  const output = row.map(cell => (cell === 1) ? alive : dead).join(colSeparator);
  return `${colSeparator}${output}${colSeparator}`;
};

const testShowGrid = (grid, alive = 'x', dead = ' ', colSeparator = '|') => {
  if (grid[0] === undefined) {
    return 'Invalid grid to show';
  }
  return grid.map(row => testShowRow(row, alive, dead, colSeparator)).join('\n');
};

const testCompareGrids = (a, b) => {

  const aType = typeof a;
  const bType = typeof b;
  if (aType !== bType) {
    // console.log('a and b do not have the same type');
    return false;
  }

  const aRows = a.length;
  const bRows = b.length;
  if (aRows !== bRows) {
    // console.log('a and b do not have the same number of rows');
    return false;
  }

  const aCols = a[0].length;
  const bCols = b[0].length;
  if (aCols !== bCols) {
    // console.log('a and b do not have the same number or columns');
    return false;
  }

  for (let i = 0; i < aRows; i++) {
    for (let j = 0; j < aCols; j++) {
      const aVal = a[i][j];
      const bVal = b[i][j];
      if (aVal !== bVal) {
        // console.log(`a[${i}][${j}] !== b[${i}][${j}] (${aVal} !== ${bVal})`);
        return false;
      }
    }
  }

  return true;
};

const tests = [

  // Test 1
  {
    seed: [
      [1, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ],
    generation: 1,
    expected: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1]
    ]
  },

  // // Test 2
  // {
  //   seed: [
  //     [0, 0, 0],
  //     [1, 1, 1],
  //     [0, 1, 0]
  //   ],
  //   generation: 2,
  //   expected:[
  //     [0, 0, 0],
  //     [0, 0, 1],
  //     [0, 1, 1],
  //     [0, 1, 0]
  //   ]
  // },

  // // Test 3
  // {
  //   seed: [
  //     [1, 1, 1],
  //     [1, 1, 1],
  //     [1, 1, 1],
  //     [1, 1, 1],
  //   ],
  //   generation: 1,
  //   expected: [
  //     [0, 0, 1, 0, 0],
  //     [0, 1, 0, 1, 0],
  //     [1, 0, 0, 0, 1],
  //     [1, 0, 0, 0, 1],
  //     [0, 1, 0, 1, 0],
  //     [0, 0, 1, 0, 0],
  //   ]
  // }

];

console.log(
  tests.map((test, index) => {

    const asserted = getGeneration(test.seed, test.generation);
    const expected = test.expected;

    if (!testCompareGrids(asserted, expected)) {
      return [
        (index+1) + ') NOT PASSED',
        '',
        'Expected',
        testShowGrid(expected, 'x', '-'),
        '',
        'Asserted',
        testShowGrid(asserted, 'x', '-'),
        ''
      ].join('\n');
    }

    return (index + 1) + ') PASSED';

  }).join('\n')
);
