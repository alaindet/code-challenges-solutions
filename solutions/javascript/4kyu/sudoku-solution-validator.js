/**
 * This checks if an input sudoku board is valid (win condition met) or not
 * Since it uses try/catch, it can be fine tuned to point the wrong cell
 * 
 * The win condition is met when all columns, rows and all the 3x3 squares have
 * all the digits from 1 to 9, with no repetition, which translates to having
 * their sum always equal to 45 (1+2+3+...+9=45)
 * 
 * @param array board Missing values must exist in the board and be equal to 0!
 * @return boolean TRUE if the board meets the win condition
 */
const validSolution = board => {

  const winCondition = 45;
  const colSums = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const rowSums = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const squareSums = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  // Populate all sums
  for (y = 0; y < 9; y++) {
    for (x = 0; x < 9; x++) {
      rowSums[y] += board[y][x];
      colSums[x] += board[y][x];
      squareSums[Math.floor(y / 3)][Math.floor(x / 3)] += board[y][x];
    }
  }

  try {

    // Check by row
    rowSums.forEach(rowSum => {
      if (rowSum !== winCondition) {
        throw false;
      }
    });

    // Check by column
    colSums.forEach(colSum => {
      if (colSum !== winCondition) {
        throw false;
      }
    });

    // Check by square
    squareSums.forEach(squareSumsRow => {
      squareSumsRow.forEach(squareSum => {
        if (squareSum !== winCondition) {
          throw false;
        }
      });
    });

    // Sudoku solved!
    return true;

  }
  
  // ERROR
  catch (error) {
    return false;
  }

};

// TESTS ----------------------------------------------------------------------
const tests = [

  [ // True
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ],

  [ // False
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 0, 3, 4, 8],
    [1, 0, 0, 3, 4, 2, 5, 6, 0],
    [8, 5, 9, 7, 6, 1, 0, 2, 0],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 0, 1, 5, 3, 7, 2, 1, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 0, 0, 4, 8, 1, 1, 7, 9]
  ]

];

console.log(
  tests.reduce((log, test) => {
    log += validSolution(test) + '\n';
    return log;
  }, '')
);
